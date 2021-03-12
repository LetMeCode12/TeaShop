import React,{Component} from "react";
import "./myButton.scss";


class MyButton extends Component {

    render(){
        return(
            <div className="myButton">
                <button ref={this.props.reff} {...this.props}/>
            </div>
        )
    }

}



export default MyButton;


