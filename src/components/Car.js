import {useRef, useEffect, useState} from 'react';
import {useContext } from 'react';
import {ThemeContext} from '../App'
import {CarContext} from '../App'
import { Link } from "react-router-dom";
import auth from "../auth/auth"
import { CardCar } from "../components/CardCar";
const apiRoute = process.env.REACT_APP_API_ROUTE;


export const Car = () =>{
    const carContext = useContext(ThemeContext)
    const productsCarContext = useContext(CarContext)
    const refCar = useRef(null)
    const refCarClose = useRef(null)
    //const [products, setproducts] = useState([]);    

    useEffect(() => {
       const token = auth.getToken()
       token===null?productsCarContext.setProductsCar([]):getProducts(token)
      }, []);


      function getLocalProducts(){
        
      }

    async function getProducts(token){
        const data = await fetch(apiRoute + "car", {
            headers: {
                'authorization': token,
            },
        }).then((response) =>
          response.json()
        );
        //console.log(data);
        productsCarContext.setProductsCar(data)
    }

    if(carContext.car){
        refCar.current.classList.add('show-cart')
    }
    
    const closeCar = () =>{
        refCar.current.classList.remove('show-cart')
        carContext.setCar(false)
    }



    return(
        <>
        <div className="cart" ref={refCar}>
            <i className='bx bx-x cart__close' ref={refCarClose} onClick={closeCar}></i>
            <h2 className="cart__title-center">My Cart</h2>
            <Link to="miCarrito" ><button href="#" className="button button--ligthB">
                 Ver carrito
                </button></Link>
            <div className="cart__container">
            {productsCarContext.productsCar.map((item) => (
                 <CardCar key={item.productData._id} 
                 img = {item.productData.imagenes[0]} 
                 nombre = {item.productData.nombre} 
                 precio={item.productData.precio}
                 Cantidad = {item.cantidad}
                 _id = {item._id}
                 talla ={item.talla}
                 producto = {item.producto}
                 
                 />
            ))}
            </div>

            <div className="cart__prices">
                <span className="cart__prices-item">3 items</span>
                <span className="cart__prices-total">$2880</span>
            </div>
        </div>
        </>
    )
}

