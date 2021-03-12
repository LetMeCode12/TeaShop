import React, { Component } from 'react'
import "./Contact.scss"

class Contact extends Component {


    render() {
        const {phoneNr, email} = this.props;


        return (
            <div className="Contact">
                {phoneNr&&
                    <div className="Phone">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <span className="mx-1">{phoneNr}</span>
                    </div>
                }
                {email&&
                    <div className="Email">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <span className="mx-1">{email}</span>
                    </div>
                }
                     
            </div>
        )
    }
}

export default Contact;

