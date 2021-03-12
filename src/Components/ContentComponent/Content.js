import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addProduct } from '../../Redux/Actions/ProductActions';
import ProductComponent from '../ProductComponent/productComponent';
import "./Content.scss";
import { isEqual } from "lodash";



// export const MemorizedProductComponent = React.memo((props) => <ProductComponent {...props} />, (prevProps, nextProps) => { return !isEqual(prevProps.Item, nextProps.Item) })


class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        const { addProduct } = this.props;
        addProduct();
    }

    componentDidUpdate(prevProps) {
        const { filter, products, match: { params: { filters } } } = this.props;


        if (!isEqual(filter, prevProps.filter) || !isEqual(products, prevProps.products) || filters !== prevProps.match.params.filters) {
            this.setState({
                products: products.sort((a, b) => this.sortProducts(a, b, filter.sort))
            }, () => {
                this.filterProducts();
            })
        }
    }

    converter = (a, b) => {
        if (b.Digit && b.Digit.toLowerCase() === "kg") {
            return a.Amount - b.Amount * 1000;
        }
        if (a.Digit && a.Digit.toLowerCase() === "kg") {
            return a.Amount * 1000 - b.Amount;
        }
        if (a.Digit && a.Digit.toLowerCase() === "kg" && b.Digit && b.Digit.toLowerCase() === "kg") {
            return a.Amount * 1000 - b.Amount * 1000;
        }
        return a.Amount - b.Amount;
    }

    filterProducts = () => {
        const { filter: { maxPrice, minPrice, maxAmount, minAmount }, match: { params: { filters } } } = this.props;

        const { products } = this.state;

        if (products.length > 0) {
            if (filters) {
                this.setState({
                    products: products.filter(e => e.Type === filters)
                })

                if(maxAmount && minAmount && +maxAmount !== 0 && +minAmount !== 0 && maxPrice && minPrice && +maxPrice !== 0 && +minPrice !== 0){
                    this.setState({
                        products: products.filter(e => ((e.Digit && e.Digit.toLowerCase() === "kg") ? e.Amount * 1000 >= minAmount && e.Amount * 1000 <= maxAmount && e.Price >= minPrice && e.Price <= maxPrice && e.Type === filters : e.Amount >= minAmount && e.Amount <= maxAmount && e.Price >= minPrice && e.Price <= maxPrice && e.Type === filters ))
                    })
                } else if (maxPrice && minPrice && +maxPrice !== 0 && +minPrice !== 0) {
                    this.setState({
                        products: products.filter(e => e.Price >= minPrice && e.Price <= maxPrice && e.Type === filters)
                    })
                } else if (maxAmount && minAmount && +maxAmount !== 0 && +minAmount !== 0) {
                    this.setState({
                        products: products.filter(e => ((e.Digit && e.Digit.toLowerCase() === "kg") ? e.Amount * 1000 >= minAmount && e.Amount * 1000 <= maxAmount && e.Type === filters : e.Amount >= minAmount && e.Amount <= maxAmount && e.Type === filters))
                    })
                } 
            }else{
                if(maxAmount && minAmount && +maxAmount !== 0 && +minAmount !== 0 && maxPrice && minPrice && +maxPrice !== 0 && +minPrice !== 0){
                    this.setState({
                        products: products.filter(e => ((e.Digit && e.Digit.toLowerCase() === "kg") ? e.Amount * 1000 >= minAmount && e.Amount * 1000 <= maxAmount && e.Price >= minPrice && e.Price <= maxPrice : e.Amount >= minAmount && e.Amount <= maxAmount && e.Price >= minPrice && e.Price <= maxPrice ))
                    })
                } else if (maxPrice && minPrice && +maxPrice !== 0 && +minPrice !== 0) {
                    this.setState({
                        products: products.filter(e => e.Price >= minPrice && e.Price <= maxPrice )
                    })
                } else if (maxAmount && minAmount && +maxAmount !== 0 && +minAmount !== 0) {
                    this.setState({
                        products: products.filter(e => ((e.Digit && e.Digit.toLowerCase() === "kg") ? e.Amount * 1000 >= minAmount && e.Amount * 1000 <= maxAmount : e.Amount >= minAmount && e.Amount <= maxAmount ))
                    })
                }
            }
        }


    }


    sortProducts(a, b, type) {
        switch (type) {

            case "Price low":
                return a.Price - b.Price;

            case "Price high":
                return b.Price - a.Price;

            case "Amount low":
                return this.converter(a, b);

            case "Amount high":
                return this.converter(b, a);

            default:
                return this.sortByString(a, b, type);
        }
    }

    sortByString(a, b, type) {
        if (a[`${type}`] < b[`${type}`])
            return -1;
        if (a[`${type}`] > b[`${type}`])
            return 1;
        return 0;
    }


    render() {
        const { products } = this.state;
        console.log("Propsy:", this.props);
        return (
            <div className="Content ">
                <div className="row px-4">
                    {products.map(e => (<div className='col-lg-6 col-xl-3'><ProductComponent Item={e} /></div>))}
                </div>
            </div>
        )
    }
}

export default compose(
    connect(state => ({
        products: state.Products.Products
    }), dispatch => ({
        addProduct: () => dispatch(addProduct())
    }))
)(Content);

