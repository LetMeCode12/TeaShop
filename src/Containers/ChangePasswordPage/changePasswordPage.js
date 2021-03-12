import React, { Component} from 'react';
import { compose } from 'redux';
import "./changePasswordPage.scss"
import { withRouter } from "react-router";
import ChangePasswordForm from '../../Components/Forms/changePasswordForm/changePasswordForm';


class ChangePasswordPage extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
        sendCode: false
    }


}

sendCodeFunction = () => {
    this.setState({
        sendCode: true
    })
}


  render() {
    const {sendCode}= this.state;
    return (
      <div className="ChangePasswordPage" >
         <ChangePasswordForm sendCodeFunction={this.sendCodeFunction} sendCode={sendCode} />
      </div>
    );
  }
}

export default compose(
  withRouter
)(ChangePasswordPage);

