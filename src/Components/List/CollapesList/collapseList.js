import React, { Component } from "react";
import "./collapseList.scss"
import List from "../../../Components/List/list"

export default class CollapseList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { item } = this.props;

        this.setState({
            data: item.productsList
        })

    }

    setOpen = (e) => {
         if (e.target.type!=="button"&&e.target.type!=="submit") {
            if (this.CollapseRef.classList.contains("expand")) {
                this.CollapseRef.classList.remove("expand");
            } else {
                this.CollapseRef.classList.add("expand");
            }
         }
    }

    render() {
        const { headers, item, index, getData, collapseHeaders } = this.props;
        const { data } = this.state;
        console.log("Data:", data)
        return (

            <div className="Collapselist" >
                <div onClick={(e) => this.setOpen(e)}> {headers.map(header => <span>{getData(header, item, index)}</span>)}
                </div>
                <div className="CollapseData" ref={reff => (this.CollapseRef = reff)}>
                    {<List headers={collapseHeaders} data={data} />}
                </div>

            </div>
        )
    }
}

