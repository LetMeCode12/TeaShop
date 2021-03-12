import React, { Component, createRef } from 'react';
import "./UserSection.scss";
import Portal from "../../Components/Portals/RenderInPortal";
import MyButton from "../../Components/Button/myButton";
import LoginForm from "../../Components/Forms/loginForm/loginForm";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { find, isEqual } from "lodash";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import {removeUser} from "../../Redux/Actions/UserAction"


class UserSection extends Component {

  constructor(props) {
    super(props);
    this.MyRef = createRef();
    this.state = {
      userData: undefined
    }
  }

  componentDidUpdate(prevProps) {
    const { userData } = this.props;

    if (!isEqual(userData, prevProps.userData)) {
      this.forceUpdate();
    }

  }

  signOut = async () => {
    const {removeUser} = this.props;
    try {
      await Auth.signOut({ global: true });
      removeUser();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  render() {

    const { userData } = this.props;
    console.log("TEST:",userData?find(userData.UserAttributes,{Name:"sub"}):undefined)
    return (
      <div className="UserSection">
        <div className="Logo">
          <i class="fa fa-coffee fa-2x" aria-hidden="true"></i>
          <h1 className="mx-1">Tea Shop</h1>
        </div>
        <div className="Registration">
          {userData &&
            <>
            <div className = 'userName'>
              <div><i class="fa fa-user" aria-hidden="true"></i> <span>{userData.Username}</span></div>
            </div>

             
            

              
              <MyButton className="MyButton" onClick={this.signOut}>Wyloguj</MyButton>
            </>
          }
          {!userData &&
            <>
              <MyButton className="MyButton" reff={this.MyRef}>Logowanie</MyButton>
              <Portal reff={this.MyRef}>
                <LoginForm />
              </Portal>
              <MyButton onClick={() => { this.props.history.push("/registration") }} className="MyButton">Rejstracja</MyButton>
            </>
          }
        </div>
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(state=>({
    userData:state.User.User
  }),dispatch=>({
    removeUser:()=>dispatch(removeUser())
  }))
)(UserSection);

