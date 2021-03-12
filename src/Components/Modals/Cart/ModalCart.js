import React, { Component } from 'react'
import { Modal, Button } from "react-bootstrap";
import { connectModal, hide } from 'redux-modal';
import { compose } from "redux";
import { connect } from 'react-redux';
import { isNil, isEqual, cloneDeep } from "lodash"
import "./ModalCart.scss"
import NotificationManager from 'react-notifications/lib/NotificationManager';
import ReactTooltip from 'react-tooltip'
import { addOrder, getOrders, deleteOrder } from "../../../Redux/Actions/OrdersActions";
import { getUserId } from './ModalCartUtils';
import moment from 'moment';
import List from "../../../Components/List/list"


class ModalCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            orders:[],
            enableOrder: false
        }
    }

    componentDidMount() {
        const { products,getOrders } = this.props;
        const cart = [];
        if (!isNil(localStorage.getItem("cart"))) {
            JSON.parse(localStorage.getItem("cart")).map(item => {
                cart.push(products.find((e) => e.id === item.itemId));
            })
            this.setState({
                cart
            })
        }
        getOrders(getUserId())
    }


    componentDidUpdate(prevProps, prevState) {
        const {orders,getOrders} =this.props;
        const {cart} = this.state;
        
        if (!isEqual(prevState.cart, cart)||!isEqual(orders,this.state.orders)) {
            console.log("Weszlo!",cart,prevState.cart)
            console.log("Weszlo2!",orders,prevState.orders)
            console.log("Weszlo3!",isEqual(orders,this.state.orders))
            console.log("Weszlo4!",isEqual(cart,prevState.cart))
            this.setState({
                enableOrder: this.enableOrder(),
                orders,
                cart
            })
            getOrders(getUserId())
        }
    }

    onDelete = (index, item) => {
        const { cart } = this.state;
        const _cart = cloneDeep(cart);
        const cartToSave = [];
        if (item.id === _cart[index].id) {
            _cart.splice(index, 1);
            this.setState({
                cart: _cart
            });
            _cart.forEach(itm => {
                cartToSave.push({ itemId: itm.id });
            })
            localStorage.setItem("cart", JSON.stringify(cartToSave))
            NotificationManager.success("Usunięto z koszyka", "Pomyślnie usunięto")
        } else {
            NotificationManager.error("Nie udało się usunąć z koszuka", "Błąd")
        }
    }

    onOrder = () => {
        const { handleHide } = this.props;
        const { cart } = this.state;
        const Body = {
            userId: getUserId(),
            products: cart,
            time: Date.now()
        }
        console.log("Body:", Body)
        NotificationManager.info("Składanie zamówienia", "Zamawianie")
        addOrder(Body).then(() => {
            NotificationManager.success("Złożono zamówienie", "Pomyślnie zamówiono")
            localStorage.removeItem("cart")
            handleHide();
        }).catch(() => {
            NotificationManager.error("Składanie zamówienia nie powiodło się", "Błąd")
        })
    }

    enableOrder = () => {
        const { user } = this.props;
        const { cart } = this.state;
        if (user && cart && cart.length > 0) {
            return true;
        }
        return false;
    }

    onDeleteOrder = (item,index,value) => {
        const {orders}=this.state;
        deleteOrder(value.id).then(()=>{
            NotificationManager.success("Anulowano zamówienie", "Pomyślnie anulowano")
            this.setState({
                orders:orders.filter(e=>e.id!==value.id)
            })
        }
        ).catch((err)=>{
            console.error(err);
            NotificationManager.error("Anulowanie zamówienia nie powiodło się", "Błąd")
        })
    }

    dateFormater = (time) => {
        return moment(time).format("DD.MM.YYYY HH:mm")
    }

    checkOrders=()=>{
        const {orders}=this.state;
        const {user} = this.props;
       return !!(user && orders && orders.length > 0)
    }

    render() {
        const headers = [{
            name: "Nr zamówienia",
        },
        {
            name: "Data zamówienia",
            data: "time",
            formater: this.dateFormater
        },
        {
            remove: this.onDeleteOrder
        }
        ]

        const collapseHeaders = [{
            name: "Nazwa produktu",
            data: "Name"
        },
        {
            name:"Ilość",
            data:"Amount"
        },
        {
            name:"Jednostka",
            data:"Digit"
        },
        {
            name:"Cena",
            data:"Price",
            formater:(value)=>(+value).toFixed(2)
        }
        ]

        const { show, handleHide, user } = this.props;
        const { cart, enableOrder ,orders } = this.state;
    
        return (
            <Modal size="lg" show={show} onHide={handleHide}>
                <Modal.Header closeButton>
                    <h2>Koszyk</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className={`Cart ${this.checkOrders()?"Orders":""}`}>
                        {(!cart || cart.length <= 0) &&
                            <span>Bark przedmitów w koszyku</span>
                        }
                        {cart && cart.length > 0 && cart[0] &&
                            cart.map((e, index) =>
                                <div className="Item d-flex my-1">
                                    <img src={e.Img} />
                                    <div className="Info">
                                        <span>{e.Name}</span>
                                        {e.Country &&
                                            <span>Kraj pochodzenia: {e.Country}</span>
                                        }
                                        {e.Amount && e.Digit &&
                                            <span>Ilość: {e.Amount}{e.Digit}</span>
                                        }
                                        {e.Price &&
                                            <span>Cena: {(+e.Price).toFixed(2)} zł</span>
                                        }
                                    </div>
                                    <Button className="Buttonek btn btn-danger" onClick={() => this.onDelete(index, e)} >Usuń</Button>
                                </div>)
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mr-auto"><h3>Suma: {cart.map(e=>+e.Price).reduce((a,b)=>a+b,0)} zł</h3></div>
                    <div data-tip-disable={!!user} data-type="info" data-tip="Aby zamówic wymagane jest zalogowanie">
                        <Button className={`btn btn-${enableOrder ? "success" : "secondary"}`} onClick={this.onOrder} disabled={!enableOrder} >Zamów</Button>
                    </div>
                    <Button className="btn btn-danger" onClick={handleHide} >Zamknij</Button>
                </Modal.Footer>
                { this.checkOrders() &&
                    <>
                        <Modal.Header >
                            <h2>Zamówienia</h2>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <List collapse={collapseHeaders} headers={headers} data={orders.sort((a, b) => a.time - b.time)} />
                            </div>
                        </Modal.Body>
                    </>
                }
                <ReactTooltip effect="solid" />

            </Modal>
        )
    }
}

export default compose(
    connect(state => ({
        products: state.Products.Products,
        user: state.User.User,
        orders: state.Orders.Orders
    }), dispatch => ({
        getOrders: (userId) => dispatch(getOrders(userId))
    })),
    connectModal({ name: 'ModalCart' })
)(ModalCard);

