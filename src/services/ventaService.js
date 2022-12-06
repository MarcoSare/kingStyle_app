import auth from "../auth/auth"
const baseUrl = process.env.REACT_APP_API_ROUTE

const addVenta = async (venta) =>{
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "venta", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify(venta)
      }).then( (response) =>response
      ).catch(console);
    const response = await data.json()
    console.log(response)
    return response;
}




const getFactura = async () =>{
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "factura", {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
          }
      }).then( (response) =>response
      ).catch(console);
    const response = await data.json()
    return response;
}


const getFacturaById = async (id) =>{
    const body ={
        _id : id
    }
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "getFacturaByID", {
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify(body)
      }).then( (response) =>response
      ).catch(console);
    const response = await data.json()
    return response;
}


export default {addVenta, getFactura, getFacturaById}