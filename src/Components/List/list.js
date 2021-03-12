import React, { Component, useState } from 'react'
import { compose } from "redux";
import "./list.scss";
import { Button } from "react-bootstrap";
import CollapseList from "./CollapesList/collapseList";



class List extends Component {

       
    getData = (header, item, index) => {
        if (header.remove) {
            const { remove } = header;
            return <Button className="Buttonek btn btn-danger" onClick={(e) => remove(e,index, item)} >Anuluj</Button>

        } else if (header.formater) {
            return header.formater(item[header.data])
        } else if (!header.data) {
            return index + 1;
        }
        return item[header.data];
    }

    render() {
    
        const { headers, data, collapse } = this.props;
        console.log("Headers:", headers, "Data:", data)
        return (
    
            <div className="List ">
                <div className="Headers">
                    {headers.map((e) => <span>{e.name}</span>)}
                </div>
                <div className="Data" >
                    {!collapse &&
                    <>
                    {data.map((item,index)=><div className="myList">{headers.map(header => <span>{this.getData(header, item, index)}</span>)}</div>)}
                    </>
                    }
                    {collapse &&
                    <>
                    {data.map((item, index) =><CollapseList collapseHeaders={collapse} getData={this.getData} headers={headers} item={item} index={index}/>)}
                    </>
                    }
                </div>

            </div>
        )
    }
}

export default compose(
)(List);