import { store } from "../../../Redux/Store"
import {get} from "lodash";

export const getUserId = () =>{
    const User = store.getState().User.User
    if(User){
    const UserAttributes = User.UserAttributes;
    return get(UserAttributes.find((o) => o.Name === "sub"), "Value")
    }
}