import React, { Component} from 'react';
import { compose } from 'redux';
import "./registrationPage.scss"
import { withRouter } from "react-router";
import RegistrationForm from '../../Components/Forms/registrationForm/registrationForm';


class RegistrationPage extends Component {

  render() {
    console.log("propzy:",this.props)
    return (
      <div className="RegistrationPage" >
          <RegistrationForm/>
      </div>
    );
  }
}

export default compose(
  withRouter
)(RegistrationPage);

