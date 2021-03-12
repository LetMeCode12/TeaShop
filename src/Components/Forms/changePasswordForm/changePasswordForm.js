import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import MyButton from "../../Button/myButton";
import Input from "../../Imput/Input";
import "./changePasswordForm.scss";
import { submit, validate } from "./changePasswordFormSubmit"
import { loginErrorsValid } from "../../../Functions/Errors/errorsFunction"
import { withRouter } from "react-router-dom";


const formName = "registrationForm";

class ChangePasswordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateError: undefined
        }


    }


    componentDidUpdate(prevProps) {
        const { errors,sendCode } = this.props
        if (errors.message !== prevProps.errors.message) {
            if (errors.message) {
                this.setState({
                    stateError: loginErrorsValid(errors.message)
                })
                this.forceUpdate();
            } else {
                this.setState({
                    stateError: undefined
                })
            }
        }
        // if(sendCode!==prevProps.sendCode){

        // }
    }
    render() {
        const { handleSubmit,sendCode } = this.props;
        const { stateError } = this.state;
        console.log("Props:", this.props)
        return (
            <div className="PreFormChangePassword">
                <form className={formName} onSubmit={handleSubmit}>

                    <h1>Zmiana hasła</h1>
                    {!sendCode &&
                        <>
                            <Field stateError={stateError} name="username" type="text" placeholder="Login" component={Input} />
                            <MyButton type="submit">Wyślij kod</MyButton>
                        </>
                    }
                    {sendCode &&
                        <>
                            <Field stateError={stateError} name="username" type="text" placeholder="Login" component={Input} />
                            <Field stateError={stateError} name="code" type="number" placeholder="Kod z wiadomości email" component={Input} />
                            <Field stateError={stateError} name="password" type="password" placeholder="Nowe Hasło" component={Input} />
                            <MyButton type="submit">Zmień hasło</MyButton>
                        </>
                    }
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
)(ChangePasswordForm);