import {CarContext} from '../App'
import { useContext } from 'react';
import {useRef, useEffect, useState} from 'react';
import CarService from "../services/carService";
import Alerts from './Alerts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import localCar from '../localStorage/localCar';
const MySwal = withReactContent(Swal)

export const CardCar = ({img, nombre, precio, Cantidad, _id,producto,talla})=>{
    const carContext = useContext(CarContext)
    const productsCarContext = useContext(CarContext)  
    const textError = useRef(null)
    const btnPlus = useRef(null)
    const btnSub = useRef(null)
    const [cantidad, setCantidad] = useState(Cantidad)
    

    async function sumaCantidad(){
        let data
        data = await CarService.quantityCar(producto,(cantidad+1),talla,_id)
        const  response= await data.json()
        if(response.message === "Succesful"){
            console.log("++")
            const newProducts = await CarService.getCar(null)
            console.log(newProducts)
            productsCarContext.setProductsCar(newProducts)
            const subTotal = carContext.carContext
            const newTotal = subTotal + precio 
            carContext.setCarContext(newTotal)
            setCantidad(cantidad+1)
            textError.current.classList.remove('div__flex');
            textError.current.classList.add('div__none');
        }else{
            textError.current.innerHTML = "Sin Stock"
            textError.current.classList.remove('div__none');
            textError.current.classList.add('div__flex');
        }
    } 
    
    async function sumaLocalCantidad(){
        let data
        data = await CarService.quantityLocalCar(producto,(cantidad+1),talla)
        const  response= await data.json()
        if(response.message === "Succesful"){
            console.log("++")
            const newProducts =  localCar.updateLocalOneProduct(producto,talla,(cantidad+1))
            console.log(newProducts)
            //productsCarContext.setProductsCar(newProducts)
            const subTotal = carContext.carContext
            const newTotal = subTotal + precio 
            carContext.setCarContext(newTotal)
            setCantidad(cantidad+1)
            textError.current.classList.remove('div__flex');
            textError.current.classList.add('div__none');
        }else{
            textError.current.innerHTML = "Sin Stock"
            textError.current.classList.remove('div__none');
            textError.current.classList.add('div__flex');
        }
    } 

    async function restaLocalCantidad(){
        let data
         
        data = await CarService.quantityLocalCar(producto,(cantidad+1),talla)
        const  response= await data.json()
        if(response.message === "Succesful"){
            console.log("++")
            const newProducts =  localCar.updateLocalOneProduct(producto,talla,(cantidad+1))

            console.log(newProducts)
            //productsCarContext.setProductsCar(newProducts)
            const subTotal = carContext.carContext
            const newTotal = subTotal + precio 
            carContext.setCarContext(newTotal)
            setCantidad(cantidad+1)
            textError.current.classList.remove('div__flex');
            textError.current.classList.add('div__none');
        }else{
            textError.current.innerHTML = "Sin Stock"
            textError.current.classList.remove('div__none');
            textError.current.classList.add('div__flex');
        }
    } 

    async function restaCantidad (){
        const data = await CarService.quantityCar(producto,(cantidad-1),talla,_id)
        const  response= await data.json()
        if(response.message === "Succesful"){
            console.log("++")
            const newProducts = await CarService.getCar(null)
            console.log(newProducts)
            productsCarContext.setProductsCar(newProducts)
            const subTotal = carContext.carContext
            const newTotal = subTotal - precio 
            carContext.setCarContext(newTotal)
            setCantidad(cantidad-1)
            textError.current.classList.remove('div__flex');
            textError.current.classList.add('div__none');
        }else{
            textError.current.innerHTML = "Cantidad minima"
            textError.current.classList.remove('div__none');
            textError.current.classList.add('div__flex');
        }
    }

    async function deleteFromCar (){
        const isConfirmed = await Alerts.alertConfirm("Confirma para continuar","¿Quires eliminar este producto de tu carrito?")
        if(isConfirmed){
            const data = await CarService.deleteToCar(null,producto)
            const  response= await data.json()
            if(response.message === "Deleted"){
                const newProducts = await CarService.getCar(null)
                console.log(newProducts)
                productsCarContext.setProductsCar(newProducts)
                const subTotal = carContext.carContext
                const newTotal = subTotal - (cantidad*precio)
                carContext.setCarContext(newTotal)
            }else{
               console.log("error")
            }
        }
    } 


    async function deleteFromLocalCar (){
        const isConfirmed = await Alerts.alertConfirm("Confirma para continuar","¿Quires eliminar este producto de tu carrito?")
        if(isConfirmed){
            const data = localCar.deleteLocalOneProduct(producto,talla)
            let newProducts = await CarService.localCar(data)
            newProducts = await newProducts.json()
            console.log(newProducts)
            productsCarContext.setProductsCar(newProducts)
            const subTotal = carContext.carContext
            const newTotal = subTotal - (cantidad*precio)
            carContext.setCarContext(newTotal)
        }
    } 

    


        
    return (
            <>
            <article className="cart__card">
                    <div className="cart__box">
                        <img src={img} alt="" className="cart__img"/>
                    </div>
                    <div className="cart__details">
                        <h3 className="cart__title">{nombre}</h3>
                        <span className="cart__price">${precio}</span>
                        <h4 ref ={textError} className="">Talla: {talla}</h4>
                        <h4 ref ={textError} className="text__color__error div__none">Sin Stock</h4>
                        <div className="cart__amount">
                            <div className="cart__amount-content">
                                <span className="cart__amount-box">
                                    <i ref={btnSub} className='bx bx-minus' onClick={() => restaCantidad()}></i>
                                </span>
                                <span className="cart__amount-number">{cantidad}</span>
                                <span className="cart__amount-box">
                                    <i ref={btnPlus} className='bx bx-plus' onClick={() => sumaLocalCantidad()}></i>
                                </span>
                            </div>
                            <i className='bx bx-trash-alt cart__amount-trash text__color__delete' onClick={()=>  deleteFromCar ()}></i>
                        </div>
                    </div>
                </article>
            </>
        )
}