import Select from "react-select";
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import domicilioServicie from "../services/domicilioServicie";
import direccionController from "../controllers/direccionController";
export const Domicilio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  useEffect(() => {
    console.log(id)
    getData();
  }, []);

  const getData = async () => {
    const data = await domicilioServicie.getEdoMun();
    setListEdo(data);
    if(id !== undefined){
        const dataDomicilio = await domicilioServicie.getDireccionById(id)
        console.log(dataDomicilio)
        setNombre(dataDomicilio.nombre)
        setCp(dataDomicilio.codigo_postal)
        setEdo(dataDomicilio.estado)
        setMunicipio(dataDomicilio.municipio)
        setColonia(dataDomicilio.colonia)
        setCalle(dataDomicilio.calle)
        setNoExt(dataDomicilio.num_ext)
        setNoInt(dataDomicilio.num_int)
        setCalle1(dataDomicilio.calle_1)
        setCalle2(dataDomicilio.calle_2)
        setLugar(dataDomicilio.lugar)
        setTel(dataDomicilio.tel_cont)
        setDesc(dataDomicilio.descripcion)
    }

  };

  const [listMun, setListMun] = useState([]);
  const [listEdo, setListEdo] = useState([]);

  const [municipio, setMunicipio] = useState("Selecciona");
  const [edo, setEdo] = useState("Selecciona");
  const [nombre, setNombre] = useState("");
  const [cp, setCp] = useState("");
  const [colonia, setColonia] = useState("");
  const [calle, setCalle] = useState("");
  const [noExt, setNoExt] = useState("");
  const [noInt, setNoInt] = useState("");
  const [calle1, setCalle1] = useState("");
  const [calle2, setCalle2] = useState("");
  const [lugar, setLugar] = useState("");
  const [tel, setTel] = useState("");
  const [desc, setDesc] = useState("");

  const changeMun = (mun) => {
    setListMun(mun);
    setMunicipio("Selecciona");
  };

  const handle = async (e) => {
    e.preventDefault();
    if(direccionController.veriSelects(edo, municipio)){
        const direccion = {
            _id : id,
            nombre: nombre,
            codigo_postal: cp,
            estado: edo,
            municipio: municipio,
            colonia: colonia,
            calle: calle,
            num_ext: noExt,
            num_int: noInt,
            calle_1: calle1,
            calle_2: calle2,
            lugar: lugar,
            tel_cont: tel,
            descripcion: desc,
          };
          let a
          if(id!==undefined)
            a = await direccionController.editDireccion(direccion)
          else 
           a = await direccionController.addDireccion(direccion);
          if (a === true) navigate("/checkout");
    }
    
  }
//editDireccion
  const onlyNumbers = (event) =>{
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
  }

  return (
    <>
      <section className="story section container">
        <form onSubmit={handle}>
          <div className="story__container grid">
            <div className="story__data div__container">
              <h2 className="section__title story__section-title">
                Agrega un domicilio
              </h2>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre y apellidos"
                className="newsletter__input m-all_05"
                defaultValue={nombre}
                required
                onChange={(e) => setNombre(e.target.value)}
              />
              <p className="story__description ml-1 text__domicilio">
                Tal cual figure en el INE o IFE.
              </p>

              <input
                type="text"
                name="cp"
                defaultValue={cp}
                placeholder="Codigo postal"
                className="newsletter__input m-all_05"
                required
                onKeyPress={(e) => onlyNumbers(e)}
                onChange={(e) => setCp(e.target.value)}
              />
              <p className="story__description ml-1">Estado</p>

              <Select
                defaultValue={{ label: "Selecciona", value: "Selecciona" }}
                className="newsletter__input m-all_05"
                options={listEdo}
                placeholder="Estado"
                value={{ label: edo, value: edo }}
                onChange={(e) => {
                  changeMun(e.mun);
                  setEdo(e.value);
                }}
              />

              <p className="story__description ml-1">Municipio</p>
              <Select
                defaultValue={{ label: "Selecciona", value: "Selecciona" }}
                className="newsletter__input m-all_05"
                options={listMun}
                placeholder="Municipio"
                value={{ label: municipio, value: municipio }}
                onChange={(e) => {
                  setMunicipio(e.value);
                }}
              />

              <input
                type="text"
                name="colonia"
                defaultValue={colonia}
                placeholder="Colonia"
                className="newsletter__input m-all_05"
                required
                onChange={(e) => setColonia(e.target.value)}
              />

              <input
                type="text"
                name="calle"
                defaultValue={calle}
                placeholder="Calle"
                className="newsletter__input m-all_05"
                required
                onChange={(e) => setCalle(e.target.value)}
              />

              <input
                type="text"
                name="noExterior"
                defaultValue={noExt}
                placeholder="No. Exterior"
                className="newsletter__input m-all_05"
                required
                onKeyPress={(e) => onlyNumbers(e)}
                onChange={(e) => setNoExt(e.target.value)}
              />

              <input
                type="text"
                name="noInterior"
                defaultValue={noInt}
                placeholder="Nº interior/Depto (opcional)"
                className="newsletter__input m-all_05"
                onKeyPress={(e) => onlyNumbers(e)}
                onChange={(e) => setNoInt(e.target.value)}
              />
            </div>
            <div className="story__data div__container">
              <p className="story__description ml-1">¿En qué calles estás? {" (Opcional)"}</p>

              <input
                type="text"
                name="calle1"
                defaultValue={calle1}
                placeholder="Calle 1"
                className="newsletter__input m-all_05"
                onChange={(e) => setCalle1(e.target.value)}
              />

              <input
                type="text"
                name="calle2"
                defaultValue={calle2}
                placeholder="Calle 2"
                className="newsletter__input m-all_05"
                onChange={(e) => setCalle2(e.target.value)}
              />

              <p className="story__description  ml-1">¿Es tu trabajo o casa?</p>
              <div className="div__radio">
                <input
                  type="radio"
                  name="lugar"
                  value="Casa"
                  className="ml-1"
                  required
                  onChange={(e) => setLugar(e.target.value)}
                  checked = {lugar=== "Casa"?true:false}
                />
                <i className="fa-solid fa-house-user ml-1 icon__home"></i>
                <label className="ml-1" htmlFor="html">
                  Casa
                </label>

                <input
                  type="radio"
                  name="lugar"
                  value="Trabajo"
                  className="ml-1"
                  required
                  onChange={(e) => setLugar(e.target.value)}
                  checked = {lugar=== "Trabajo"?true:false}
                />
                <i className="fa-solid fa-briefcase ml-1 icon__home"></i>
                <label className="ml-1" htmlFor="css">
                  Trabajo
                </label>
              </div>

              <input
                type="text"
                name="tel"
                defaultValue={tel}
                placeholder="Telefono"
                className="newsletter__input m-all_05"
                required
                onKeyPress={(e) => onlyNumbers(e)}
                onChange={(e) => setTel(e.target.value)}
              />

              <p className="story__description  ml-1">
                Indicaciones adicionales para entregar tus compras en esta
                dirección
              </p>
              <textarea
                name="descripcion"
                defaultValue={desc}
                placeholder="Descripcion"
                className="newsletter__input m-all_05"
                required
                onChange={(e) => setDesc(e.target.value)}
              />
              <button href="#" className="button">
                Continuar
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
