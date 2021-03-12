import { getUserData } from "../../Functions/Token/token";

let initialState = {
    Name:"User",
    User:getUserData()
}

export const UserReducer=(state=initialState, action)=>{
    switch(action.type){
        case "ADD_USER":{
            return {...state, User:action.payload}
        }
        case "REMOVE_USER":{
            return {...state, User:undefined}
        }
        default:
            return state;
    }
}

