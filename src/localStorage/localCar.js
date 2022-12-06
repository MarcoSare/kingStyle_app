

const addProductToCar = (prodcut) =>{
    const products = localStorage.getItem("products")
    if(products===null){
        let array=[]
        array.push(prodcut)
        let productToString = JSON.stringify(array);
        console.log(productToString)
        localStorage.setItem('products', productToString);
    }else{
        let newProducts = JSON.parse(products);
        newProducts.push(prodcut)
        let productToString = JSON.stringify(newProducts);
        console.log(productToString)
        localStorage.setItem('products', productToString);
    }
    
}


const getLocalProducts = ()=>{
    const products = localStorage.getItem("products")
    if(products===null)
    return []
    else{
        let newProducts = JSON.parse(products);
        return newProducts
    }
}

const deleteLocalOneProduct = (producto, talla) =>{
    const products = localStorage.getItem("products")
    let newProducts = JSON.parse(products);
    newProducts = newProducts.filter(function(el) { return el.prodcuto !== producto && el.talla!==talla }); 
    console.log(newProducts)
    let productToString = JSON.stringify(newProducts);
    localStorage.setItem('products', productToString);
    return newProducts
}


const updateLocalOneProduct = (producto, talla, cantidad) =>{
    const products = localStorage.getItem("products")
    let newProducts = JSON.parse(products);
    console.log(talla)
    console.log(newProducts)
    const OneProducts = newProducts.find((item) => {
        console.log(item.talla + " " +item.producto)
        console.log(talla + " "+producto)
        if(item.talla===talla && item.producto ===producto)
        return item
    });  
    console.log(OneProducts)
    const index = newProducts.findIndex((item) => item === OneProducts)
    console.log(index)
    newProducts[index].cantidad = cantidad
    let productToString = JSON.stringify(newProducts);
    localStorage.setItem('products', productToString);
    return newProducts
}



export default {addProductToCar, getLocalProducts, deleteLocalOneProduct,updateLocalOneProduct}
