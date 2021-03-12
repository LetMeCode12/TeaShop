import NotificationManager from 'react-notifications/lib/NotificationManager';
import { getToken } from '../../Functions/Token/token';

export const getOrders = (userId) => async dispatch =>{
    
    try{
      const response = await fetch(`https://ivnj0xc9he.execute-api.eu-central-1.amazonaws.com/Tea-Develop/getTable?table=Orders&key=userId&value=${userId}`,{
           method:"GET",
           mode:"cors"
       })
       const data = await response.json();
       console.log("Zamówienia:",data)
       if(data.Items){
       dispatch({type:"ADD_ORDERS",payload:data.Items.sort((a,b)=>a.time-b.time)})
       }
    }catch(err){
        console.error("Fetch Error:",err);
    } 
}

export const deleteOrder = (orderId) =>{
    NotificationManager.info("Anulawoanie zamówienia", "Zamawianie w trakcie anulowania")
    return fetch("https://ivnj0xc9he.execute-api.eu-central-1.amazonaws.com/Tea-Develop/orders/delete", {
          method:"DELETE",
          mode: "cors",
          headers: { "Authorization": getToken() },
          body: JSON.stringify({value:orderId})
      })
}


export const addOrder = (Body) =>{
    NotificationManager.info("Składanie zamówienia", "Zamawianie")
      return fetch("https://ivnj0xc9he.execute-api.eu-central-1.amazonaws.com/Tea-Develop/orders/add", {
            method: "POST",
            mode: "cors",
            headers: { "Authorization": getToken() },
            body: JSON.stringify(Body)
        })
}
