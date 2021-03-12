import React, { Component} from 'react';
import { compose } from 'redux';
import "./contentPage.scss"
import { withRouter } from "react-router";
import Filter from '../../Components/FilterComponent/Filter';
import Content from '../../Components/ContentComponent/Content';


class ContentPage extends Component {

  constructor(props){
    super(props);
    this.state={
      sort:"Type",
      maxPrice:undefined,
      minPrice:undefined,
      maxAmount:undefined,
      minAmount:undefined
    }
  }

  onChange=(type,e)=>{
    this.setState({
      [type]:e
    },()=>{
      console.log("Stejty:",this.state)
    })
  }



  render() {
    return (
      <div className="ContentPage" >
          <Filter onChange={this.onChange}/>
         <Content {...this.props} filter={this.state}/>
      </div>
    );
  }
}

export default compose(
  withRouter
)(ContentPage);

