import { Auth } from "aws-amplify";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { addErrorLogin, removeErrors } from "../../../Redux/Actions/ErrorsActions";

export const submit = async (values, dispatch, props) => {

    const { username, password,email,city,adress,code,phone_number } = values;
        console.log("SUBMITL::", values, props, dispatch)

    try {
        const attributes= {
            email:email,
            'custom:custom:city':city,
            'custom:custom:adress':adress,
            'custom:custom:code':code
        }
     
        if(phone_number){
            attributes.phone_number=`+48${phone_number}`.split(" ").join("");
        }
        console.log("attrib:",attributes);
        const { user } = await Auth.signUp({
            username,
            password,
            attributes 
        });
        console.log(user);
        if(user){
            NotificationManager.success("Rejestracja powiodła się", "Rejestreacja")
        }else{
            NotificationManager.error("Rejestracja nie powiodła się", "Rejestreacja")
        }
        removeErrors();
        props.history.push("/");
    } catch (err) {
        console.log(err)
        dispatch(addErrorLogin(err))
        NotificationManager.error("Rejestracja nie powiodła się", "Rejestreacja")
    }

}

export const validate = (values, props) => {
    console.log("valuse", values,"props", props);
    const { username, password,email,city,adress,code, password2 } = values;
    const errors = {}
    if (!username) {
        errors.username = 'Pole wymagane'
    }
    if (!password) {
        errors.password = 'Pole wymagane'
    }

    if (!password2) {
        errors.password2 = 'Pole wymagane'
    }

    if(password!==password2){
        errors.password = 'Hasła są różne';
        errors.password2 = 'Hasła są różne';
    }

    if (!email) {
        errors.email = 'Pole wymagane'
    }
    if (!city) {
        errors.city = 'Pole wymagane'
    }

    if (!adress) {
        errors.adress = 'Pole wymagane'
    }
    if (!code) {
        errors.code = 'Pole wymagane'
    }
    return errors
}
