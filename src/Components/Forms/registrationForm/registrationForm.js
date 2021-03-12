import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import MyButton from "../../Button/myButton";
import Input from "../../Imput/Input";
import "./registrationForm.scss";
import { submit, validate } from "./registrationFormSubmit"
import { loginErrorsValid } from "../../../Functions/Errors/errorsFunction"
import { withRouter } from "react-router-dom";


const formName = "registrationForm";

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateError: undefined
        }


    }


    componentDidUpdate(prevProps) {
        const { errors } = this.props
        if (errors.message !== prevProps.errors.message) {
            if (errors.message) {
                this.setState({
                    stateError: loginErrorsValid(errors.message)
                })
                this.forceUpdate();
            }else{
                this.setState({
                    stateError: undefined
                })  
            }
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const {stateError} =this.state;
        console.log("Props:",this.props)
        return (
            <div className="PreFormRegistration">
                <form className={formName} onSubmit={handleSubmit}>

                    <h1>Rejestracja</h1>


                    <Field stateError={stateError} name="username" type="text" placeholder="Login" component={Input} />
                    <Field stateError={stateError} name="password" type="Password" placeholder="Hasło" component={Input} />
                    <Field stateError={stateError} name="password2" type="Password" placeholder="Potwierdź Hasło" component={Input} />
                    <Field stateError={stateError} name="email" type="email" placeholder="Email" component={Input} />
                    <Field stateError={stateError} name="phone_number" type="tel" placeholder="Telefon" component={Input} />
                    <Field stateError={stateError} name="city" type="text" placeholder="Miasto" component={Input} />
                    <Field stateError={stateError} name="adress" type="text" placeholder="Adress" component={Input} />
                    <Field stateError={stateError} name="code" type="text" placeholder="Kod Pocztowy" component={Input} />
                    <MyButton type="submit">Zarejestruj</MyButton>
                </form>
            </div>
        );
    }

}

export default compose(
    withRouter,
    reduxForm({
        form: formName,
        onSubmit: submit,
        validate
    }),
    connect(state => ({
        errors: state.Errors.Error
    }))
)(RegistrationForm);