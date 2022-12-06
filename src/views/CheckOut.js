import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginService from "../services/loginService";
import domicilioServicie from "../services/domicilioServicie";
import direccionController from "../controllers/direccionController";
import facturaController from "../controllers/facturaController";
import carService from "../services/carService";
import { CardCar } from "../components/CardCar";
import { CarContext } from "../App";
import { useContext } from "react";
import auth from "../auth/auth";
import { CheckOutCard } from "../components/CheckOutCard";
import cuponService from "../services/cuponService";
import checkOutController from "../controllers/checkOutController";
import ventaController from "../controllers/ventaController";

export const CheckOut = () => {
  const carContext = useContext(CarContext);
  const refBtnDesc = useRef(null);
  const refInputDesc = useRef(null);
  const refTextDesc = useRef(null);

  const productsCarContext = useContext(CarContext);
  const [listDireccion, setListDireccion] = useState([]);
  const [listFact, setListFact] = useState([]);
  const [cupon, setCupon] = useState("");
  const [total, setTotal] = useState(0);
  const [porcentaje, setProcentaje] = useState(0);
  const [porCantidad, setPorCantidad] = useState(0);
  const [antes, setAntes] = useState(0);
  const [flagDesc, setFlagDesc] = useState(false);
  const [direccion, setDireccion] = useState(null);
  const [factura, setFactura] = useState(null);
  const [metodo, setMetodo] = useState(null);
  const [options, setOptions] = useState(0);
  const [confirmCompra, setConfirmCompra] = useState(false);
  const [lugarCompra, setLugarCompra] = useState("");
  const [selectDireccion, setSelectDireccion] = useState("");
  const [selectFac, setSelectFac] = useState("");
  useEffect(() => {
    const token = auth.getToken();
    getProducts(token);
  }, []);

  async function getProducts(token) {
    const data = await carService.getCar(null);
    const direcciones = await domicilioServicie.getDireccion();
    const facturas = await facturaController.getFactura();

    let sub = 0;
    data.map((item) => {
      sub += item.cantidad * item.productData.precio;
      setTotal(sub);
    });
    setListDireccion(direcciones);
    setListFact(facturas);
    productsCarContext.setProductsCar(data);
  }

  async function deleteDireccion(id) {
    const data = await direccionController.deleteDireccion(id);
    if (data) {
      const direcciones = await domicilioServicie.getDireccion();
      setListDireccion(direcciones);
    }
  }

  const handleDescuento = async (e) => {
    e.preventDefault();
    const data = await cuponService.getDescuento(cupon);
    console.log(data);
    console.log(data.message);
    if (data.message === "Successful") {
      refInputDesc.current.disabled = true;
      refBtnDesc.current.disabled = true;
      refTextDesc.current.classList.remove("div__none");
      refTextDesc.current.classList.add("div__flex");
      const newTotal = ((100 - parseInt(data.porcentaje)) / 100) * total;
      setProcentaje(data.porcentaje);
      setPorCantidad((total - newTotal).toFixed(2));
      setAntes(total);
      setTotal(newTotal);
      setFlagDesc(true);
    }
  };

  const handleContinuar = (e) => {
    e.preventDefault();
    if (checkOutController.veriData(direccion)) {
      window.alert("simon");
      console.log(metodo);
      setOptions(1);
    }
  };

  const handleMetodo = async (e) => {
    e.preventDefault();
    setConfirmCompra(true);
    setOptions(2);
    const data = await domicilioServicie.getDireccionById(direccion);
    setSelectDireccion(data);
    console.log(factura);
    if (factura !== null) {
      const fa = await facturaController.getFacturaByID(factura);
      setSelectFac(fa);
    }
  };


  const handleComprar = async(e) =>{
    e.preventDefault();
    let products =[]
    let venta = {}
    productsCarContext.productsCar.map((item) => {
      const producto = {producto : item.productData._id}
      products.push(producto)
    })
    console.log(products)

    if(factura!==null)
    venta = {
      monto : total,
      productos : products,
      direccion: selectDireccion,
      factura: selectFac
    }
    else
    venta = {
      monto : total,
      productos : products,
      direccion: selectDireccion
    }
    console.log(venta)

   const insert = await ventaController.addVenta(venta)
   console.log(insert)
   if(insert){
    await checkOutController.realizarCompra()
   
   }
   
  }

  if (options === 0)
    return (
      <>
        <section className="story section container">
          <div className="story__container grid">
            <div className="story__data">
              <div className="cart__container">
                <h2 className="cart__title-center">Tu compra</h2>
                {productsCarContext.productsCar.map((item) => (
                  <CheckOutCard
                    key={item.productData._id + item.talla}
                    img={item.productData.imagenes[0]}
                    nombre={item.productData.nombre}
                    precio={item.productData.precio}
                    Cantidad={item.cantidad}
                    _id={item._id}
                    talla={item.talla}
                    producto={item.productData._id}
                  />
                ))}
              </div>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento porcentaje: {porcentaje}%
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento efectivo: {porCantidad}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Antes : {antes}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Ahora : {total}$
              </h3>
              <h2 className="cart__title-center">Total a pagar: {total}</h2>
            </div>
            <div>
              <h1 className="story__description mb_05">Codigo de descuento</h1>
              <form
                className="div__domicilio p-all_05"
                onSubmit={handleDescuento}
              >
                <div>
                  <input
                    type="text"
                    name="cupon"
                    placeholder="Código"
                    className="newsletter__input  mr-1 input__cupon"
                    ref={refInputDesc}
                    required
                    onChange={(e) => setCupon(e.target.value)}
                  />
                  <p
                    className="text__domicilio div__none text__color__succ"
                    ref={refTextDesc}
                  >
                    Se ha aplicado tu descuento
                  </p>
                </div>
                <button
                  href="#"
                  className="button button--ligthB btn__cupon"
                  ref={refBtnDesc}
                >
                  Aplicar
                </button>
              </form>

              <div className="div__flex div__space__between mt-1 mb_05">
                <h1 className="story__description">Domicilio</h1>

                <Link
                  to="/domicilio"
                  className="button button--ligthB btn__cupon"
                >
                  Agregar
                </Link>
              </div>
              <form onSubmit={handleContinuar}>
                {listDireccion.map((item) => (
                  <div className="div__domicilio" key={item._id}>
                    <div className="div__icon__location">
                      <i className="fa-solid fa-location-dot icon__location"></i>
                    </div>

                    <div className="div__domi__desc">
                      <h4 className="story__description">
                        CP: {item.codigo_postal}
                      </h4>
                      <p className="text__domicilio">
                        {item.calle + " #" + item.num_ext}
                      </p>
                      <p className="text__domicilio">{item.colonia}</p>
                      <p className="text__domicilio">
                        {item.municipio + ", " + item.estado}
                      </p>
                    </div>

                    <div className="div__icon__location">
                      <i
                        className="fa-solid fa-trash icon__delete mr-1"
                        onClick={() => deleteDireccion(item._id)}
                      ></i>
                      <Link
                        to={"/domicilio/" + item._id}
                        className="fa-solid fa-pen-to-square icon__edit"
                      ></Link>
                      <input
                        type="radio"
                        className="radio__button ml-1"
                        name="direccion"
                        value={item._id}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>
                ))}

                <h1 className="story__description mt-1 mb_05">
                  Métodos de pago
                </h1>
                <div className="div__domicilio">
                  <div className="div__icon__location">
                    <i className="fa-solid fa-credit-card icon__location"></i>
                  </div>

                  <div className="div__domi__desc">
                    <h4 className="story__description">Tarjeta de credito</h4>
                  </div>
                  <div className="div__icon__location">
                    <input
                      type="radio"
                      className="radio__button"
                      name="tipoPago"
                      required
                      value="Tarjeta de Credito"
                      onChange={(e) => setMetodo(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="div__domicilio">
                  <div className="div__icon__location">
                    <i className="fa-regular fa-credit-card icon__location"></i>
                  </div>

                  <div className="div__domi__desc">
                    <h4 className="story__description">Tarjeta de debito</h4>
                  </div>
                  <div className="div__icon__location">
                    <input
                      type="radio"
                      className="radio__button"
                      name="tipoPago"
                      required
                      value="Tarjeta de Debito"
                      onChange={(e) => setMetodo(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="div__domicilio">
                  <div className="div__icon__location">
                    <i className="fa-solid fa-money-bill icon__location"></i>
                  </div>

                  <div className="div__domi__desc">
                    <h4 className="story__description">Efectivo</h4>
                  </div>
                  <div className="div__icon__location">
                    <input
                      type="radio"
                      className="radio__button"
                      name="tipoPago"
                      value="Efectivo"
                      required
                      onChange={(e) => setMetodo(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="div__flex div__space__between mt-1 mb_05">
                  <h1 className="story__description">Facturación</h1>

                  <Link
                    to="/factura"
                    className="button button--ligthB btn__cupon"
                  >
                    Agregar
                  </Link>
                </div>
                {listFact.map((item) => (
                  <div className="div__domicilio" key={item._id}>
                    <div className="div__icon__location">
                      <i className="fa-solid fa-file-invoice icon__location"></i>
                    </div>

                    <div className="div__domi__desc">
                      <h4 className="story__description">RFC : {item.rfc}</h4>
                      <p className="text__domicilio">{item.nombre}</p>
                      <p className="text__domicilio">
                        {item.municipio + ", " + item.estado}
                      </p>
                      <p className="text__domicilio">{item.razon_social}</p>
                    </div>

                    <div className="div__icon__location">
                      <i className="fa-solid fa-trash icon__delete mr-1"></i>
                      <Link
                        to={"/domicilio"}
                        className="fa-solid fa-pen-to-square icon__edit"
                      ></Link>
                      <input
                        type="radio"
                        className="radio__button ml-1"
                        name="direccion"
                        value={item._id}
                        onChange={(e) => setFactura(e.target.value)}
                      ></input>
                    </div>
                  </div>
                ))}

                <button className="button button--ligthB">
                  Continuar compra
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  else if (
    options === 1 &&
    (metodo === "Tarjeta de Credito" || metodo === "Tarjeta de Debito")
  )
    return (
      <>
        <section className="story section container">
          <div className="story__container grid">
            <div className="story__data">
              <div className="cart__container">
                <h2 className="cart__title-center">Tu compra</h2>
                {productsCarContext.productsCar.map((item) => (
                  <CheckOutCard
                    key={item.productData._id + item.talla}
                    img={item.productData.imagenes[0]}
                    nombre={item.productData.nombre}
                    precio={item.productData.precio}
                    Cantidad={item.cantidad}
                    _id={item._id}
                    talla={item.talla}
                    producto={item.productData._id}
                  />
                ))}
              </div>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento porcentaje: {porcentaje}%
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento efectivo: {porCantidad}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Antes : {antes}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Ahora : {total}$
              </h3>
              <h2 className="cart__title-center">Total a pagar: {total}</h2>
            </div>

            <form className="div__domicilio p-all_05" onSubmit={handleMetodo}>
              <div>
                <h2 className="cart__title-center">Ingresa los datos</h2>
                <input
                  type="text"
                  name="no. Tarjeta"
                  placeholder="No. Tarjeta"
                  className="newsletter__input m-all_05 input__tarjeta"
                  required
                  onChange={(e) => setCupon(e.target.value)}
                />
                <input
                  type="text"
                  name="nomTarjeta"
                  placeholder="Nombre y apellidos"
                  className="newsletter__input m-all_05 input__tarjeta"
                  required
                  onChange={(e) => setCupon(e.target.value)}
                />
                <div className="div__center m-all_05">
                  <input
                    type="text"
                    name="fecExpe"
                    placeholder="Fecha de expiración"
                    className="newsletter__input m-all_05 input__tarjeta__small"
                    required
                    onChange={(e) => setCupon(e.target.value)}
                  />
                  <input
                    type="text"
                    name="codSeg"
                    placeholder="Código de seguridad"
                    className="newsletter__input m-all_05 input__tarjeta__small"
                    required
                    onChange={(e) => setCupon(e.target.value)}
                  />
                </div>
                <div className="div__center m-all_05">
                  <i className="fa-regular fa-credit-card icon__tarjeta"></i>
                  <button className="button button--ligthB ml-1">
                    Continuar compra
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  else if (options === 1 && metodo === "Efectivo")
    return (
      <>
        <section className="story section container">
          <div className="story__container grid">
            <div className="story__data">
              <div className="cart__container">
                <h2 className="cart__title-center">Tu compra</h2>
                {productsCarContext.productsCar.map((item) => (
                  <CheckOutCard
                    key={item.productData._id + item.talla}
                    img={item.productData.imagenes[0]}
                    nombre={item.productData.nombre}
                    precio={item.productData.precio}
                    Cantidad={item.cantidad}
                    _id={item._id}
                    talla={item.talla}
                    producto={item.productData._id}
                  />
                ))}
              </div>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento porcentaje: {porcentaje}%
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento efectivo: {porCantidad}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Antes : {antes}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Ahora : {total}$
              </h3>
              <h2 className="cart__title-center">Total a pagar: {total}</h2>
            </div>
            <form onSubmit={handleMetodo}>
              <h1>Efectivo</h1>
              <p className="story__description ml-1">¿Dónde quieres pagar?</p>
              <div className="div__domicilio">
                <div className="div__icon__location">
                  <img
                    src="https://1000marcas.net/wp-content/uploads/2022/02/OXXO-Logo.png"
                    width="50"
                    height="50"
                  />
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">Oxxo</h4>
                </div>
                <div className="div__icon__location">
                  <input
                    type="radio"
                    className="radio__button"
                    name="tipoPago"
                    required
                    value="oxxo"
                    onChange={(e) => setLugarCompra(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="div__domicilio">
                <div className="div__icon__location">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Seven_eleven_logo.svg/2048px-Seven_eleven_logo.svg.png"
                    width="50"
                    height="50"
                  />
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">seven</h4>
                </div>
                <div className="div__icon__location">
                  <input
                    type="radio"
                    className="radio__button"
                    name="tipoPago"
                    required
                    value="seven"
                    onChange={(e) => setLugarCompra(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="div__domicilio">
                <div className="div__icon__location">
                  <img
                    src="https://corpo.couche-tard.com/wp-content/uploads/2021/08/logo-full-color-cmyk-1.png"
                    width="50"
                    height="50"
                  />
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">Circle K</h4>
                </div>
                <div className="div__icon__location">
                  <input
                    type="radio"
                    className="radio__button"
                    name="tipoPago"
                    required
                    value="circle"
                    onChange={(e) => setLugarCompra(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="div__domicilio">
                <div className="div__icon__location">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/BBVA_Bancomer_logo.svg/2560px-BBVA_Bancomer_logo.svg.png"
                    width="50"
                    height="50"
                  />
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">Bancomer</h4>
                </div>
                <div className="div__icon__location">
                  <input
                    type="radio"
                    className="radio__button"
                    name="tipoPago"
                    required
                    value="bbva"
                    onChange={(e) => setLugarCompra(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="div__domicilio">
                <div className="div__icon__location">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Logo_de_Citibanamex_%28sin_texto%29.svg/2096px-Logo_de_Citibanamex_%28sin_texto%29.svg.png"
                    width="50"
                    height="50"
                  />
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">Banamex</h4>
                </div>
                <div className="div__icon__location">
                  <input
                    type="radio"
                    className="radio__button"
                    name="tipoPago"
                    required
                    value="banamex"
                    onChange={(e) => setLugarCompra(e.target.value)}
                  ></input>
                </div>
              </div>
              <button className="button button--ligthB ml-1">
                Continuar compra
              </button>
            </form>
          </div>
        </section>
      </>
    );
  else if (options === 2)
    return (
      <>
        <section className="story section container">
          <div className="story__container grid">
            <div className="story__data">
              <div className="cart__container">
                <h2 className="cart__title-center">Tu compra</h2>
                {productsCarContext.productsCar.map((item) => (
                  <CheckOutCard
                    key={item.productData._id + item.talla}
                    img={item.productData.imagenes[0]}
                    nombre={item.productData.nombre}
                    precio={item.productData.precio}
                    Cantidad={item.cantidad}
                    _id={item._id}
                    talla={item.talla}
                    producto={item.productData._id}
                  />
                ))}
              </div>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento porcentaje: {porcentaje}%
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Descuento efectivo: {porCantidad}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Antes : {antes}$
              </h3>
              <h3
                className={flagDesc ? "cart__title" : "cart__title div__none"}
              >
                Ahora : {total}$
              </h3>
              <h2 className="cart__title-center">Total a pagar: {total}</h2>
            </div>

            <div>
              <h2 className="cart__title-center">Confirmar tu compra</h2>
              <h1 className="story__description mt-1 mb_05">
                Direccion de envío
              </h1>
              <div className="div__domicilio" key={selectDireccion._id}>
                <div className="div__icon__location">
                  <i className="fa-solid fa-location-dot icon__location"></i>
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">
                    CP: {selectDireccion.codigo_postal}
                  </h4>
                  <p className="text__domicilio">
                    {selectDireccion.calle + " #" + selectDireccion.num_ext}
                  </p>
                  <p className="text__domicilio">{selectDireccion.colonia}</p>
                  <p className="text__domicilio">
                    {selectDireccion.municipio + ", " + selectDireccion.estado}
                  </p>
                </div>
              </div>
              <h1 className="story__description mt-1 mb_05">Método de Pago</h1>
              <div className="div__domicilio">
                <div className="div__icon__location">
                  <i
                    className={
                      metodo !== "Efectivo"
                        ? "fa-regular fa-credit-card icon__location"
                        : "fa-solid fa-money-bill icon__location"
                    }
                  ></i>
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">{metodo}</h4>
                </div>
              </div>

              <h1
                className={
                  selectFac !== ""
                    ? "story__description mt-1 mb_05"
                    : "div__none"
                }
              >
                Info. Factura
              </h1>

              <div
                className={selectFac !== "" ? "div__domicilio" : "div__none"}
                key={selectFac._id}
              >
                <div className="div__icon__location">
                  <i className="fa-solid fa-file-invoice icon__location"></i>
                </div>

                <div className="div__domi__desc">
                  <h4 className="story__description">RFC : {selectFac.rfc}</h4>
                  <p className="text__domicilio">{selectFac.nombre}</p>
                  <p className="text__domicilio">
                    {selectFac.municipio + ", " + selectFac.estado}
                  </p>
                  <p className="text__domicilio">{selectFac.razon_social}</p>
                </div>
              </div>

              <form onSubmit={handleComprar}>
                <button className="button button--ligthB ml-1">
                  Confirmar compra
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
};
