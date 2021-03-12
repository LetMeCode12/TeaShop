import { Auth } from "aws-amplify";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { getUserData } from "../../../Functions/Token/token";
import { addErrorLogin, removeErrors } from "../../../Redux/Actions/ErrorsActions";
import { addUser } from "../../../Redux/Actions/UserAction";

export const submit = async (values, dispatch, props) => {

    const { Login, Password, Code } = values;
    console.log("SUBMITL::", values, props, dispatch)
    if (Code) {
        try {
            Auth.confirmSignUp(Login, Code).then((user)=>{
                console.log("User:", user)
                NotificationManager.success("Pomyślnie potwierdzono","Logowanie")
                dispatch(removeErrors())
                console.log("Data:", getUserData());
                dispatch(addUser( getUserData()))
                props.close();
            }).catch((err)=>{
                NotificationManager.error("Potwierdzenie nie powiodło się","Logowanie")
                console.error(err)
                dispatch(addErrorLogin(err))
            });;
        
            dispatch(removeErrors())
       
            dispatch(addUser( await getUserData()))
            props.close();
        } catch (err) {
            console.log('error confirming sign up', err);
            dispatch(addErrorLogin(err))
        }
       
    } else {
        try {
            NotificationManager.info("Logowanie")
            Auth.signIn(Login, Password).then((user)=>{
                console.log("User:", user)
                NotificationManager.success("Pomyślnie zalogowano","Logowanie")
                dispatch(removeErrors())
                console.log("Data:", getUserData());
                dispatch(addUser( getUserData()))
                props.close();
            }).catch((err)=>{
                NotificationManager.error("Logowanie nie powiodło się","Logowanie")
                console.error(err)
                dispatch(addErrorLogin(err))
            });
        } catch (err) {
            console.log(err)
            dispatch(addErrorLogin(err))
        }
    }

}

export const validate = (values, props) => {
    console.log("valuse", values, props);
    const { Login, Password } = values;
    const errors = {}
    if (!Login) {
        errors.Login = 'Pole wymagane'
    }
    if (!Password) {
        errors.Password = 'Pole wymagane'
    }


    return errors
}
