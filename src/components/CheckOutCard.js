import {CarContext} from '../App'
import { useContext } from 'react';
import {useRef, useEffect, useState} from 'react';
import CarService from "../services/carService";
import Alerts from './Alerts';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import localCar from '../localStorage/localCar';


export const CheckOutCard = ({img, nombre, precio, Cantidad, _id,producto,talla})=>{
    const carContext = useContext(CarContext)
    const [cantidad, setCantidad] = useState(Cantidad)
    

    
   

        
    return (
            <>
            <article className="cart__card">
                    <div className="cart__box">
                        <img src={img} alt="" className="cart__img"/>
                    </div>
                    <div className="cart__details">
                        <h3 className="cart__title">{nombre}</h3>
                        <span className="cart__price">${precio}</span>
                        <h4 className="">Importe: {cantidad*precio}</h4>
                        <div className="cart__amount">
                            <div className="cart__amount-content">
                                <span className="cart__amount-box">
                                <h4 className="">Cantidad de piezas:</h4>
                                </span>
                                <span className="cart__amount-number">{cantidad}</span>
                                <span className="cart__amount-box">
                                </span>
                            </div>
                          
                        </div>
                    </div>
                </article>
            </>
        )
}