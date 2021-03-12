import React, { Component } from 'react';
import { compose } from 'redux';
import ReactDOM from "react-dom";

class Portal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      portal: false,
      childs:undefined
    }
    this.Portal = React.createRef();
    this.myRef = props.reff;
    this.loginShow = this.loginShow.bind(this);
  }

  componentDidMount(){
    this.myRef.current.onclick=this.loginShow;
    const {children} =this.props;
    this.setState({
      childs:React.cloneElement(children,{...children.props,close:()=>this.childClose()})
    })
  }

  childClose=()=>{
    this.setState({
      portal:false
    })
  }


  loginShow = (e) => {
    e.preventDefault();
    
    this.Portal.current.style.position="absolute";
    this.Portal.current.style.top=`${e.target.getBoundingClientRect().bottom || 0}px`;
    this.Portal.current.style.left=`${e.target.getBoundingClientRect().left+(e.target.getBoundingClientRect().width/2)|| 0}px`;
    

    this.setState({ portal: true })
    
    let portalDetect = (ee) => {
      if (this.myRef.current&& this.Portal.current &&!this.myRef.current.contains(ee.target) && !this.Portal.current.contains(ee.target)) {
        this.setState({ portal: false })
        window.removeEventListener('click', portalDetect);
        this.forceUpdate();
      }

    }
    window.addEventListener('click', portalDetect);
  }


  render() {
    const { portal,childs} = this.state;
    return (
        ReactDOM.createPortal(<div ref={this.Portal} >{portal && childs}</div>, document.body)
    );
  }
}

export default compose(

)(Portal);

