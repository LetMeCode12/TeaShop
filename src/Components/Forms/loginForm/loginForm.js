import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import MyButton from "../../Button/myButton";
import Input from "../../Imput/Input";
import "./loginForm.scss";
import { submit, validate } from "./loginFormSubmit"
import { loginErrorsValid } from "../../../Functions/Errors/errorsFunction"
import { withRouter } from "react-router-dom";
import { formValueSelector } from 'redux-form'
import { addErrorLogin } from "../../../Redux/Actions/ErrorsActions";
import { Auth } from "aws-amplify";
import NotificationManager from "react-notifications/lib/NotificationManager";

const formName = "loginForm";

const el = ({ data }) => {
    return <div className="item m-1" {...data} />
}

const Memo = React.memo(el);

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{ children: "Rejestracja", onClick: () => {props.history.push("/registration")} },{ children: "Odzyskaj haslo", onClick: () => {props.history.push("/changePassword")}}],
            stateError: undefined,
            resetCode:false
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

    isNotActivate=()=>{
        const {stateError} =this.state;
        return (stateError==="Podaj kod otrzymany na email"||stateError==="Nieprawidłowy kod aktywacyjny")
    }

    resetCode=async ()=>{
        const {Login,dispatch} = this.props;
        
        try {
            Auth.resendSignUp(Login).then(()=>{
                NotificationManager.success("Pomyślnie wysłano","Reset")
            }).catch((err)=>{
                NotificationManager.error("Wysyłanie nie powiodło się","Reset")
                console.error(err)
            });
            this.setState({
                resetCode:true
            })
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
            dispatch(addErrorLogin(err))
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const {stateError,resetCode} =this.state;
       
        return (
            <div className="PreFormLogin">
                <div className="Arrow-Up" />
                <form className={formName} onSubmit={handleSubmit}>

                    <h1>Logowanie</h1>


                    <Field stateError={stateError} name="Login" type="text" placeholder="Login" component={Input} />
                    <Field stateError={stateError} name="Password" type="Password" placeholder="Hasło" component={Input} />
                    { this.isNotActivate() &&
                        <>
                        <Field stateError={stateError} name="Code" type="number" placeholder="Kod Aktywacyjny" component={Input} />
                        {resetCode&&
                            <span>Wysłano nowy kod</span>
                        }
                        <MyButton type="button" onClick={()=>this.resetCode()} >Wyślij kod ponownie</MyButton>
                        </>
                    }
                    <MyButton type="submit">Logowanie</MyButton>
                    <div className="d-flex w-100 m-2">
                        {this.state.items.map(e => <Memo data={e} />)}
                    </div>

                </form>
            </div>
        );
    }

}

const selector = formValueSelector(formName)
export default compose(
    reduxForm({
        form: formName,
        onSubmit: submit,
        validate
    }),
    connect(state => ({
        errors: state.Errors.Error,
        Login: selector(state, 'Login')
    })),
    withRouter
)(LoginForm);