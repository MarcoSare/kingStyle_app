import React from "react";
import { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import auth from "../auth/auth";
import { useContext } from "react";
import productService from "../services/productService";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../App";
import ReactImageMagnify from "react-image-magnify";
import productoDetailsController from "../controllers/productoDetailsController";

export const ProductDetails = () => {
  const productsCarContext = useContext(CarContext);
  const navigate = useNavigate();
  const img = useRef(null);
  const refQuantity = useRef(null);
  const textError = useRef(null);
  const { sku } = useParams();
  const [producto, setproducto] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [talla, setTalla] = useState(null);
  const [token, setToken] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    const T = auth.getToken();
    setToken(T);
    getProduct();
  }, []);

  const changeImg = (imagen) => {
    img.current.src = imagen;
  };

  const getProduct = async () => {
    const data = await productService.getProductBySku(sku);
    setproducto(data);
    getColor(data.color);
  };

  const addToCar = async () => {
    productoDetailsController.addToCar(
      token,
      producto,
      quantity,
      talla,
      productsCarContext
    );
    
  };

  const addToLocalCar = () => {
    productoDetailsController.addToLocalCar(talla, producto, quantity);
    
  };

  const valiQuantity = (newQuantity) => {
    productoDetailsController.valiQuantity(
      newQuantity,
      cantidad,
      textError,
      setQuantity,
      refQuantity
    );
  };

  const getColor = (Color) => {
    return productoDetailsController.getColor(Color);
  };

  if (producto === null)
    return (
      <>
        <main className="main">
          <section
            className="featured section container"
            id="featured"
          ></section>
          <div className="loading">
            <img
              src="https://www.bluevision.mx/assets/img/preloader.gif"
              width="200"
              height="200"
            />
          </div>
        </main>
      </>
    );
  else
    return (
      <>
        <main className="main">
          <section className="story section container">
            <div className="story__container grid">
              <div className="sd">
                <div className="story__images">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "",
                        isFluidWidth: true,
                        src: image,
                      },
                      largeImage: {
                        src: image,
                        width: 700,
                        height: 1300,
                      },
                      enlargedImageContainerStyle: {
                        background: "#fff",
                        zIndex: 9,
                      },
                    }}
                  />
                </div>
                <div className="imagenes__container">
                  <div className="select__imagenes__container">
                    {producto.imagenes.map((elemento) => (
                      <img
                        key={elemento}
                        src={elemento}
                        className="select__imagen"
                        onClick={() => {
                          setImage(elemento);
                        }}
                        onLoad={() => {
                          setImage(producto.imagenes[0]);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="story__data">
                <h1 className="section__title story__section-title">
                  {producto.nombre}
                </h1>

                <h2 className="price__text ">${producto.precio}</h2>
                <Link to={"/guiaTallas"} className="sizes__guiaTallas">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4543/4543440.png"
                    width={"20px"}
                    height={"20px"}
                    className="sizes__iconGuiaTallas"
                  ></img>
                  Guia de tallas
                </Link>
                <h3 className="story__description">Selecciona una talla</h3>
                <div className="sizes_container">
                  {producto.talla_cantidad.map((elemento) => (
                    <div
                      key={elemento.talla}
                      className="sizes__button__container"
                    >
                      <button
                        className="sizes__button"
                        onClick={() => {
                          refQuantity.current.value = 1;
                          setCantidad(elemento.cantidad);
                          setTalla(elemento.talla);
                        }}
                      >
                        {elemento.talla}
                      </button>
                    </div>
                  ))}
                </div>

                <h3 className="bold">Colores Disponibles:</h3>

                <div className="colors__container">
                  <div className="colors__button__container">
                    {producto.colors.map((item) => (
                      <button
                        key={item.sku}
                        className="colors__button"
                        style={{ backgroundColor: getColor(item.color) }}
                        onClick={() =>
                          (window.location.href = "/producto/" + item.sku)
                        }
                      />
                    ))}
                  </div>
                </div>
                <h4 ref={textError} className="text__color__error div__none">
                  Sin Stock
                </h4>
                <h3 className="story__description bold">
                  Cantidad:
                  <input
                    ref={refQuantity}
                    className="input__quantity"
                    type="number"
                    id="tentacles"
                    name="tentacles"
                    defaultValue="1"
                    min="1"
                    max="100"
                    onChange={(e) => valiQuantity(e.target.value)}
                  ></input>
                </h3>

                <h3 className="story__description bold">
                  Disponibles:{" "}
                  {cantidad === null ? "Selecciona una talla" : cantidad}
                </h3>

                <p className="story__description text-justify">
                  {producto.descripcion}
                </p>

                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td className="bold text-right">SKU:</td>
                      <td>{producto.sku}</td>
                    </tr>
                    <tr>
                      <td className="bold text-right">MARCA:</td>
                      <td>{producto.marca}</td>
                    </tr>
                    <tr>
                      <td className="bold text-right">MODELO:</td>
                      <td>{producto.modelo}</td>
                    </tr>
                    <tr>
                      <td className="bold text-right">COMPOSICION:</td>
                      <td>{producto.composicion}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="button__product__container">
                  <button
                    href="#"
                    className="button button--ligthB m-all_05"
                    onClick={() => {
                      token === null ? addToLocalCar() : addToCar();
                    }}
                  >
                    {"Agregar al carrito"}
                  </button>

                  <button className="button m-all_25"
                  onClick={() => {
                    token === null ? addToLocalCar() : addToCar();
                  }}>
                    Comprar ahora
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
};
