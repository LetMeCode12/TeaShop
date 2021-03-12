import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { show,hide } from 'redux-modal';
import ModalCart from '../Modals/Cart/ModalCart';
import "./Routes.scss"

class Routes extends Component {

    showModal = (name) =>{
        const {show,hide}=this.props;
        show(name)
    }

    render() {
        const {history} = this.props;

        return (
            <div className="Routes">
                <div onClick={()=>{history.push("/content")}}><i class="fa fa-home fa-lg" aria-hidden="true"></i><span>Strona Główna</span></div>
                <div onClick={()=>{history.push("/content/CT")}}><i class="fa fa-snowflake-o fa-lg" aria-hidden="true"></i><span>Herbaty Mrożone</span></div>
                <div onClick={()=>{history.push("/content/LT")}}><i class="fa fa-coffee fa-lg" aria-hidden="true"></i><span>Herbaty Sypane</span></div>
                <div onClick={()=>{history.push("/content/P")}}><i class="fa fa-coffee fa-lg" aria-hidden="true"></i><span>Piramidki</span></div>
                <div onClick={()=>{history.push("/content/S")}}><i class="fa fa-coffee fa-lg" aria-hidden="true"></i><span>Saszetki</span></div>
                <div onClick={()=>{history.push("/content/YM")}}><i class="fa fa-bolt fa-lg" aria-hidden="true"></i><span>Yerba Mate</span></div>
                <div onClick={()=>{history.push("/content/A")}}><i class="fa fa-cog fa-lg" aria-hidden="true"></i><span>Akcesoria</span></div>
                <div onClick={()=>{this.showModal("ModalCart")}}><i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i><span>Koszyk</span>
                </div>
                <ModalCart/>
            </div>
        )
    }
}

export default compose(
    connect(null,dispatch=>({
        show: bindActionCreators( show , dispatch)
    })),
    withRouter
    )(Routes);