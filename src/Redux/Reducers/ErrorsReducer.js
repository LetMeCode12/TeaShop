
let initialState = {
    Name:"Errors",
    Error:{}
}

export const ErrorsReducer=(state=initialState, action)=>{
    switch(action.type){
        case "ADD_LOGIN_ERROR":{
            return {...state, Error:{...action.payload}}
        }
        case "REMOVE_ERRORS":{
            return {...state, Error:{}}
        }
        default:
            return state;
    }
}

