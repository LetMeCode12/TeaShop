export const addErrorLogin =(Error) => (dispatch)=>{
    dispatch({type:"ADD_LOGIN_ERROR",payload:Error})
}

export const removeErrors =()=>(dispatch)=>{
    dispatch({type:"REMOVE_ERRORS"})
}