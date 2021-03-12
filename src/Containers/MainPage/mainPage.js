import React, { Component } from 'react';
import { compose } from 'redux';
import "./mainPage.scss"
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { getToken, getUserData } from '../../Functions/Token/token';
import Contact from '../../Components/Contact/Contact';
import UserSection from '../../Components/UserSection/UserSection';
import ShowMenuBar from '../../Components/ShowMenuBar/ShowMenubar';
import Routes from '../../Components/Routes/Routes';
import RegistrationPage from '../RegistrationPage/registrationPage';
import ChangePasswordPage from '../ChangePasswordPage/changePasswordPage';
import ContentPage from '../ContentPage/contentPage';

class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: localStorage.MenuBar || true
    }
  }

  componentDidMount() {
    if (localStorage.MenuBar !== "Hide") {
      this.RefMenu.style.minWidth = "15rem";
      this.RefMenu.style.width = "15rem";
      this.RefMenu.style.left = "0rem";
      localStorage.setItem("MenuBar", "Show")
      this.setState({
        show: false
      })
    } else {
      this.RefMenu.style.minWidth = "0rem";
      this.RefMenu.style.width = "0rem";
      this.RefMenu.style.left = "-15rem";
      localStorage.setItem("MenuBar", "Hide")
      this.setState({
        show: true
      })
    }
  }

  ShowHide = () => {
    if (this.RefMenu.style.minWidth === "15rem") {
      this.RefMenu.style.left = "-15rem";
      this.RefMenu.style.minWidth = "0rem";
      this.RefMenu.style.width = "0rem";
      localStorage.setItem("MenuBar", "Hide")
      this.setState({
        show: true
      })
    } else {
      this.RefMenu.style.width = "15rem";
      this.RefMenu.style.minWidth = "15rem";
      this.RefMenu.style.left = "0rem";
      localStorage.setItem("MenuBar", "Show")
      this.setState({
        show: false
      })
    }
  }

  upload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file)
    console.log(data.get('file'))
    fetch(`http://192.168.0.199:8000/uploadFile?fileName=${file.name}`, {
      method: "POST",
      body: data
    })
  }

  render() {
    const { show } = this.state;
    console.log("storage", getToken())
    console.log("userData", getUserData())
    console.log("props1:", this.props)
    return (
      <div className="MainPage" >
        <ShowMenuBar show={show} onClick={this.ShowHide} />
        <div className="MenuBar" ref={reff => this.RefMenu = reff}>
          <div className="UserContent">
            <UserSection />
          </div>
          <div className="RouteContent">
            <Routes />
          </div>
          <div className="MenuFooter">
            <Contact phoneNr={"555-22-232"} email={"test@test.com"} />
          </div>
        </div>

        <div className="PageContent" ref={reff => this.PageContentReff = reff}>

          <Route path="/changePassword" component={(props) => <ChangePasswordPage {...props} />} />
          <Route path="/registration" component={(props) => <RegistrationPage {...props} />} />
          <Route exact path="/content" component={(props) => <ContentPage {...props} />} />
          
          <Route path="/content/:filters" component={(props) => <ContentPage {...props} />} />

          <Route path="/test" >
            <video autoPlay controls type="video/mp4" src="http://192.168.0.199:8000/stream"></video>

            <input ref={reff => this.file = reff} onChange={(e) => this.upload(e)} type="file" />

          </Route>

          

        </div>

      </div>
    );
  }
}

export default compose(
  withRouter
)(MainPage);

