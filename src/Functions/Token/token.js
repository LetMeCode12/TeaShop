
export const getToken = () => {
   const arraytoken = Object.entries(localStorage).find(e => e[0].includes('idToken'))
   if(arraytoken){
       return arraytoken[1];
   }
}

export const getUserData = () => {
    const arraytoken = Object.entries(localStorage).find(e => e[0].includes('userData'))
    if(arraytoken){
        return JSON.parse(arraytoken[1]);
    }
 }