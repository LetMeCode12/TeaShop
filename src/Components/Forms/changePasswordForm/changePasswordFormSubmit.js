import { Auth } from "aws-amplify";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { addErrorLogin, removeErrors } from "../../../Redux/Actions/ErrorsActions";

export const submit = async (values, dispatch, props) => {

    const { username, password, code } = values;

    if (!code && !password) {
        try {
            Auth.forgotPassword(
                username
            ).then(()=>{
                NotificationManager.success("Pomyślnie wysłano kod","Sukces")
            }).catch(()=>{
                NotificationManager.error("Wysyłanie kodu nie powiodło się","Błąd")
            })
            
            removeErrors();
            props.sendCodeFunction();
        } catch (err) {
            console.log(err)
            dispatch(addErrorLogin(err))
        }
    } else {
        try {
            Auth.forgotPasswordSubmit(
                username,
                code,
                password
            ).then(()=>{
                NotificationManager.success("Pomyślnie zmieniono hasło","Sukces")
            }).catch(()=>{
                NotificationManager.error("Zmiana hasła nie powiodła się","Błąd")
            })
            
            removeErrors();
            props.history.push("/")


        } catch (err) {
            console.log(err)
            dispatch(addErrorLogin(err))
        }
    }

}

export const validate = (values, props) => {
    console.log("valuse", values, "props", props);
    const { username, password, email, city, adress, code } = values;
    const errors = {}
    if (!username) {
        errors.username = 'Pole wymagane'
    }
    if (!password) {
        errors.password = 'Pole wymagane'
    }
    if (!code) {
        errors.code = 'Pole wymagane'
    }
    return errors
}
