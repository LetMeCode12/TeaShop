import React, { Component } from 'react'
import MyButton from '../Button/myButton';
import "./productComponent.scss"
import {NotificationManager} from 'react-notifications';


class ProductComponent extends Component {

    addToCart=(e)=>{
        const cart = JSON.parse(localStorage.getItem("cart"))||[]
        cart.push({itemId:e.id})
        localStorage.setItem("cart",JSON.stringify(cart))
        NotificationManager.success("Pomyślnie dodano do koszyka","Dodano do koszyka")
    }

    render() {
        const { Item } = this.props;
        console.log("Item:", Item)
        return (

            <div className="ProductComponent">
                <img src={Item.Img} />
                <div className="content">
                <span>{Item.Name}</span>
                    <div className="expand">
                        {Item.Country &&
                            <span>Kraj pochodzenia: {Item.Country}</span>
                        }
                        {Item.Amount && Item.Digit &&
                            <span>Ilość: {Item.Amount}{Item.Digit}</span>
                        }
                        {Item.Price &&
                            <span>Cena: {(+Item.Price).toFixed(2)} zł</span>
                        }
                        <MyButton onClick={()=>this.addToCart(Item)}>Dodaj do koszyka</MyButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductComponent;
