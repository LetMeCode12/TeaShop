import React, { Component } from 'react'
import "./Input.scss"

class Input extends Component {

    componentDidUpdate(prevProsp,prevState){

        if(prevProsp.meta!==this.props.meta){
            const {meta:{error},stateError}=this.props;
            this.inputReff.setAttribute('errorText',error||stateError)

            console.log(this.inputReff);
        }

    }


    render() {
        const {
            input,stateError, meta:{touched,error},type,placeholder
        } = this.props;
        console.log("input",this.props,touched);



        return (
            <div className={`myInput ${(touched&&(error||stateError)?"error":"")}`} ref={reff=>(this.inputReff=reff)} >
                <input type={type} {...input} placeholder={placeholder} />               
            </div>
        )
    }
}

export default Input;

