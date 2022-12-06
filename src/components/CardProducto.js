import { Link } from "react-router-dom"
export function CardProducto({nombre, precio, imagen, sku}){
   
    const productRoute = "/producto/"+sku;
    return(
        <article className="featured__card">
        <span className="featured__tag">Sale</span>

        <img src={imagen} alt="" className="featured__img"/>

        <div className="featured__data">
            <h3 className="featured__title">{nombre}</h3>
            <span className="featured__price">${precio}</span>
        </div>
        <button className="button featured__button"><Link to = {productRoute} >Ver producto</Link></button>
     </article>
    );
}

function showSku(sku){
    
}