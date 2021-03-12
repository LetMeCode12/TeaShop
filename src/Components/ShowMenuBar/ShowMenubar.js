import React, { Component } from 'react'
import "./ShowMenuBar.scss"

class ShowMenuBar extends Component {

    shouldComponentUpdate(nextProps){
        const {show}=this.props;
        return show!==nextProps.show;
    }


    render() {
       
        const {show}=this.props;
        console.log("2",show)

        return (
            <div onClick={this.props.onClick.bind(this)} className="ShowMenuBar">
                <i class={`fa fa-angle-double-${show?"right":"left"} fa-lg`} aria-hidden="true"></i>
                <span>{(show?"Open":"Close")}</span>
                <i class={`fa fa-angle-double-${show?"right":"left"} fa-lg`} aria-hidden="true"></i>
            </div>
        )
    }
}

export default ShowMenuBar;

