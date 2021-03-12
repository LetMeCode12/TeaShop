export const addProduct = () => async dispatch =>{
    try{
      const response = await fetch(`https://ivnj0xc9he.execute-api.eu-central-1.amazonaws.com/Tea-Develop/getTable?table=Products`,{
           method:"GET",
           mode:"cors"
       })
       const data = await response.json();
       console.log("data:",data)
       if(data.Items){
       dispatch({type:"ADD_PRODUCTS",payload:data.Items})
       }
    }catch(err){
        console.error("Fetch Error:",err);
    } 
}
