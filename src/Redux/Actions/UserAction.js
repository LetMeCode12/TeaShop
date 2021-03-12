export const addUser =(USER) => (dispatch)=>{
    dispatch({type:"ADD_USER",payload:USER})
}

export const removeUser =()=>(dispatch)=>{
    dispatch({type:"REMOVE_USER"})
}