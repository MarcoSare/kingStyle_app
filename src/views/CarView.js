import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {CarContext} from '../App'
import { useContext } from 'react';
import { CardCar } from "../components/CardCar";
import auth from "../auth/auth"
import localCar from "../localStorage/localCar";
import carService from "../services/carService";
const apiRoute = process.env.REACT_APP_API_ROUTE;

export const CarView = () => {
    const carContext = useContext(CarContext)
    const productsCarContext = useContext(CarContext)  


    useEffect(() => {
       const token = auth.getToken()
       token===null?getLocalProducts():getProducts(token)
      }, []);

      async function getLocalProducts(){
        const p = localCar.getLocalProducts()
        console.log(p)
        const data = await carService.localCar(p)
        const datos = await data.json()
        productsCarContext.setProductsCar(datos)
        console.log(datos)
      calcTotal(datos)
       
      }

    async function getProducts(token){
        const data = await fetch(apiRoute + "car", {
            headers: {
                'authorization': token,
            },
        }).then((response) =>
          response.json()
        );
        console.log(data);
        calcTotal(data)
        productsCarContext.setProductsCar(data)
        

    }

    function calcTotal(data){
        let total = 0
        data.map((item)=>{
            total+= item.productData.precio *  item.cantidad
        })
        console.log(total)
        carContext.setCarContext(total)
    }

    return(
        <>
        <section className="story section container">
        <div className="story__container grid">
          <div className="story__data">

          <div className="cart__container">
          <h2 className="cart__title-center">My Carito</h2>
            {productsCarContext.productsCar.map((item) => (
                 <CardCar key={item.productData._id} 
                 img = {item.productData.imagenes[0]} 
                 nombre = {item.productData.nombre} 
                 precio={item.productData.precio}
                 Cantidad = {item.cantidad}
                 _id = {item._id}
                 talla ={item.talla}
                 producto = {item.productData._id}
                
                 />
            ))} 
            </div>

            
            <h2 className="cart__title-center">Total a pagar {carContext.carContext}</h2>
            <a href="/checkout" className="button button--ligthB">
                 Continuar compra
            </a>
          </div>
          </div>
          </section>
        </>
    )
}


