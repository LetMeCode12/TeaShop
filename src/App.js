import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MainPage from './Containers/MainPage/mainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import tea from "../src/Resources/mp4/tea2.mp4"
import { compose } from 'redux';
import Amplify,{Auth}from "aws-amplify";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';



Amplify.configure(
  Auth.configure({
      region: process.env.REACT_APP_AWS_REGION,
      userPoolId: process.env.REACT_APP_AWS_USERPOOLID,
      userPoolWebClientId: process.env.REACT_APP_AWS_USERPOOLWEBCLIENTID,
      oauth: {
          domain: process.env.REACT_APP_OAUTH_DOMAIN,
          responseType: process.env.REACT_APP_AWS_OAUTH_RESPONSETYPE
      }
  })
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test: "1",
      mouseStart: 0,
      mouseEnd: 0
    }

  
  }

  

  curtain = (e) => {
    let translation = e.screenY - window.innerHeight
    if (translation < 0) {
      this.Curtain.style.top = `${translation}px`
    }
  }

  onMouseUp = () => {
    this.Main.removeEventListener("mousemove", this.curtain);
    let height = this.Main.getBoundingClientRect().height
    let top = -this.Curtain.getBoundingClientRect().top
    this.Curtain.style.transition = "all .2s linear";
    if (top < height / 2) {
      this.Curtain.style.top = `0`
    } else {
      this.Curtain.style.top = `-${height}px`
      setTimeout(() => { this.Curtain.style.display = `none` }, 200)
    }
  }

  onMouseDown = () => {
    this.Curtain.style.transition = "none";
    this.Main.addEventListener('mousemove', this.curtain);
  }


  render() {

    return (
      <div className="Main" ref={reff => this.Main = reff} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <Router>
          <div className="Curtain" ref={reff => this.Curtain = reff} >
            <video className="myVideo" autoPlay muted loop src={tea} type="video/mp4" />
            <div className="Title">
              <h1>Odnajdź swój smak !</h1>
            </div>
            <div className="TextArea">
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              <h3>Przeciągnij do góry aby przejść do serwisu</h3>
            </div>
          </div>
          <div className="App">
            <Switch>
             
              <Route exact path="/" component={(props) => <Redirect to="/content" {...props}/>} />
              <Route path="/:topic" component={(props) => <MainPage {...props} />} />
              

            </Switch>
          </div>
        </Router>
        <NotificationContainer/>
      </div>
    );
  }
}



export default compose(
  
)(App);
