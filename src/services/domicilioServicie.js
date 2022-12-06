import auth from "../auth/auth"
const baseUrl = process.env.REACT_APP_API_ROUTE



const getEdoMun= async ()=>{
   const data = await fetch(baseUrl + "edo_mun").then((response) => response.json()).catch(err => err);
   console.log(data)
    return data
}

const addDireccion = async (direccion) =>{
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "direccion", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify(direccion)
      }).then( (response) =>response
      ).catch(console);
    const response = await data.json()
    return response;

}


const editDireccion = async (direccion) =>{
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "direccion", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify(direccion)
      }).then( (response) =>response
      ).catch(console);
    const response = await data.json()
    console.log(response)
    return response;
}

const deleteDireccion = async (id)=>{
    const body ={
        _id : id
    }
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "direccion", {
        method : "DELETE",
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



const getDireccion = async () =>{
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "direccion", {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
          }
      }).then( (response) =>response
      ).catch(console);
    const response = await data.json()
    return response;
}


const getDireccionById = async (id) =>{
    const body ={
        _id : id
    }
    const token = auth.getToken()
    const data =   await fetch(baseUrl + "getDireccionByID", {
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


export default {getEdoMun,addDireccion, getDireccion, getDireccionById,editDireccion, deleteDireccion}