import auth from "../auth/auth"
const baseUrl = process.env.REACT_APP_API_ROUTE



const getProductBySku= async (sku)=>{
   const data = await fetch(baseUrl + ("producto/"+sku)).then((response) => response.json()).catch(err => err);
    return data
}




export default {getProductBySku}

