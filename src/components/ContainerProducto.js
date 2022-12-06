import React from "react";
import {CardProducto} from './CardProducto'
const apiRoute = process.env.REACT_APP_API_ROUTE

export function ContainerProducto({categoria}){
    
    const [producto, setproducto] = React.useState(null)
    console.log("sa" + producto)
    React.useEffect(() =>{
        getproductos()
    },[])

    const getproductos = async() =>{
        if (categoria.split(" ")[0]==="BUSCAR"){
        const data = await fetch(apiRoute+'motor/'+categoria.split(" ")[1])
        .then((response) => response.json())
        console.log(data)
        setproducto(data)
        }else{
        const data = await fetch(apiRoute+'producto_categoria/'+categoria)
        .then((response) => response.json())
        console.log(data)
        setproducto(data)
        }
        
    }

    if(producto===null){
        return(
            <>
            <main className="main">
            <section className="featured section container" id="featured"></section>
            <div className="loading">
            <img src="https://www.bluevision.mx/assets/img/preloader.gif" width="200" height="200" />
            
            </div>
            </main>
            </>
        )
    }
    else
    return(
    <>
     <main className="main">
     <section className="featured section container" id="featured">
                <h2 className="section__title">
                    {categoria}
                </h2>
                <div className="featured__container grid">
                    {producto.map(elemento =>(
                <CardProducto key={elemento.sku} nombre={elemento.nombre} precio ={elemento.precio} imagen={elemento.imagenes[0]} sku={elemento.sku}/>
                )) }   
                </div>
            </section>
     </main>
    </>)
}