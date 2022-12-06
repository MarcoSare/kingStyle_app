import domicilioServicie from "../services/domicilioServicie"
import carService from "../services/carService"
import Alerts from "../components/Alerts"



const veriData = (direccion) =>{
    if(direccion === null){
        Alerts.alertPosiUp("error", "Selecciona tu Estado")
        return false
    }
    return true
}

const realizarCompra = async()=>{
   const c = await carService.deleteAllCar()
    const a = await Alerts.alertUp("Felicidades", "Tu compra ha sido realizada con éxito")
window.location.href="/"  
}


export default {veriData, realizarCompra}