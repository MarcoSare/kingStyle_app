import facturaService from "../services/facturaService"
import domicilioServicie from "../services/domicilioServicie"
import ventaService from "../services/ventaService"
import Alerts from "../components/Alerts"

const addVenta = async (venta) =>{
   const data = await  ventaService.addVenta(venta)
   console.log(data)
   
    if (data.message === "Successful")
    return true
    else
    return false
}

const getFactura = async ()=>{
    const data = await facturaService.getFactura()
    return data

}


const getFacturaByID = async (id)=>{
    const data = await facturaService.getFacturaById(id)
    return data

}


const editDireccion = async (id) =>{
    const data = await  domicilioServicie.editDireccion(id)
    console.log(data)
     if (data.message === "Successful")
     return true
     else
     return false
 }


 const deleteDireccion = async (id) =>{
    const confirm = await Alerts.alertConfirm("Confirma para continuar","¿Quires eliminar esta dirección?")
    
    if(confirm){
        const data = await  domicilioServicie.deleteDireccion(id)
        console.log(data)
         if (data.message === "Successful")
         return true
         else
         return false
    }else return false
  
 }



const veriSelects = (edo, mun) =>{
    if(edo === "" || edo === "Selecciona"){
        Alerts.alertPosiUp("error", "Selecciona tu Estado")
        return false
    }else{
        if(mun ==="" || mun ==="Selecciona"){
            Alerts.alertPosiUp("error", "Selecciona tu Municipio")
            return false
        }
    }
    return true
}


export default {addVenta, veriSelects, editDireccion, deleteDireccion, getFactura, getFacturaByID}