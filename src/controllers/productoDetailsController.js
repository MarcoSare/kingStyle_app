import Alerts from "../components/Alerts";
import localCar from "../localStorage/localCar";
import CarService from "../services/carService";


const addToLocalCar = (talla,producto,quantity) =>{
    if(talla !==null){
        try{
            const newProduct = {
              producto : producto._id,
              cantidad : parseInt(quantity),
              talla: talla
            }
            localCar.addProductToCar(newProduct)
          }catch(error){
            console.log(error)
          }
          window.location.href="/miCarrito"
    }else{
        Alerts.alertPosiUp('error', 'Selecciona una talla')
    }
  }
  


  const addToCar =  async (token,producto,quantity,talla,productsCarContext) =>  {
    if(talla !==null){
        try{
            const data =  await CarService.addCar(token, producto._id, quantity, talla)
            const pro = await CarService.getCar(token)
            productsCarContext.setProductsCar(pro)
            
            
          }catch(error){
            console.log(error)
          }
          window.location.href="/miCarrito"  
    }else{
        Alerts.alertPosiUp('error', 'Selecciona una talla')
    }
  }


  const valiQuantity = (newQuantity,cantidad,textError, setQuantity,refQuantity) =>{
    if(newQuantity <= cantidad){
      setQuantity(newQuantity)
      textError.current.classList.remove('div__flex');
      textError.current.classList.add('div__none');
    }
   
    else{
      textError.current.classList.remove('div__none');
      textError.current.classList.add('div__flex');
      setQuantity(1)
      refQuantity.current.value = 1
    }
  }


  const getColor = (Color) => {
    Color = Color.toLowerCase()
    const arrayColors = [
      { color: "blanco", hexa: "#FFFFFF" },
      { color: "azul", hexa: "#2E86C1" },
      { color: "azul marino", hexa: "#032850" },
      { color: "azul claro", hexa: "#A9CCE3" },
      { color: "negro", hexa: "#000000" },
      { color: "lila", hexa: "#76448A" },
      { color: "rosa", hexa: "#F186C6" },
      { color: "rojo", hexa: "#EE1129" },
      { color: "morado", hexa: "#4A235A" },
      { color: "vino", hexa: "#971835" },
      { color: "gris", hexa: "#B3B6B7" },
      { color: "verde", hexa: "#229954" },
      { color: "beige", hexa: "#FCF3CF" },
      { color: "gris oxford", hexa: "#4D5656" },
      { color: "cafe", hexa: "#873600" },
      { color: "naranja", hexa: "#D35400" },
      { color: "verde oscuro", hexa: "#0B5345" },
      { color: "camel", hexa: "#c19a6b" },
      { color: "menta", hexa: "#98FF98" },
    ];

    const c = arrayColors.find(({color})=> color ===Color)
    return c!==undefined? c.hexa: "#FBFCFC"
  };

 
export default {addToLocalCar,addToCar, valiQuantity,getColor}