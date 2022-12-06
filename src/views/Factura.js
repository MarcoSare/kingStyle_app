import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import domicilioServicie from "../services/domicilioServicie";
import direccionController from "../controllers/direccionController";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import facturaService from "../services/facturaService";
import facturaController from "../controllers/facturaController";
export const Factura = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(id);
    getData();
  }, []);

  const getData = async () => {
    const data = await domicilioServicie.getEdoMun();
    setListEdo(data);
    if (id !== undefined) {
      const dataDomicilio = await domicilioServicie.getDireccionById(id);
      console.log(dataDomicilio);
      setNombre(dataDomicilio.nombre);
      setCp(dataDomicilio.codigo_postal);
      setEdo(dataDomicilio.estado);
      setMunicipio(dataDomicilio.municipio);
      setColonia(dataDomicilio.colonia);
      setCalle(dataDomicilio.calle);
      setNoExt(dataDomicilio.num_ext);
      
    }
  };

  const [listMun, setListMun] = useState([]);
  const [listEdo, setListEdo] = useState([]);

  const [municipio, setMunicipio] = useState("Selecciona");
  const [edo, setEdo] = useState("Selecciona");
  const [rfc, setRfc] = useState("")
  const [nombre, setNombre] = useState("");
  const [cp, setCp] = useState("");
  const [colonia, setColonia] = useState("");
  const [calle, setCalle] = useState("");
  const [noExt, setNoExt] = useState("");
  const [razon, setRazon] = useState("")
  const [gastos, setGastos] = useState("")

  const changeMun = (mun) => {
    setListMun(mun);
    setMunicipio("Selecciona");
  };

  const handle = async (e) => {
    e.preventDefault();
    if (direccionController.veriSelects(edo, municipio)) {
      const factura = {
        _id: id,
        rfc: rfc,
        nombre: nombre,
        codigo_postal: cp,
        estado: edo,
        municipio: municipio,
        colonia: colonia,
        calle: calle,
        num_ext: noExt,
        gastos: gastos,
        razon_social:razon
      };
      let a;
      if (id !== undefined)
        a = await direccionController.editDireccion(factura);
      else a = await facturaController.addFactura(factura)
      if (a === true) navigate("/checkout");
    }
  };
  //editDireccion
  const onlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <section className="story section container">
        <form onSubmit={handle}>
          <div className="story__container grid">
            <div className="story__data div__container">
              <h2 className="section__title story__section-title">
                Agrega datos de facturación
              </h2>
              <input
                type="text"
                name="RFC"
                placeholder="rfc"
                className="newsletter__input m-all_05"
                defaultValue={rfc}
                required
                onChange={(e) => setRfc(e.target.value)}
              />

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
            </div>

            <div className="story__data div__container">
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
                name="calle1"
                defaultValue={razon}
                placeholder="Razón social"
                className="newsletter__input m-all_05"
                onChange={(e) => setRazon(e.target.value)}
              />

              <input
                type="text"
                name="gastos"
                defaultValue={gastos}
                placeholder="Gastos"
                className="newsletter__input m-all_05"
                onChange={(e) => setGastos(e.target.value)}
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
