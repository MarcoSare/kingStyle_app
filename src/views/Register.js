import { Link } from "react-router-dom";
import { useState } from "react";
import Alerts from "../components/Alerts";
import Select from "react-select";
import loginService from "../services/loginService";

const apiRoute = process.env.REACT_APP_API_ROUTE;

export function Register() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("genero");

  const handlerChange = (event) => {
    setGender(event.target.value);
  };

  const listGender = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
    { value: "Otro", label: "Otro" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (gender !== "genero") {
      const schemaForm = {
        mail: `${mail}`,
        password: `${password}`,
        name: `${name}`,
        lastname: `${phone}`,
        gender: `${gender}`,
      };

      const data = await fetch(apiRoute + "register", {
        method: "POST",
        body: JSON.stringify(schemaForm),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response)
        .catch((err) => err);

      console.log(data);
      const res = await data.json();
      if ((res.message = "Successful")) {
        const log = await loginService.login(mail, password)
        const re = await log.json()
        localStorage.setItem('kingstyle_token', re.token);
        await Alerts.alertUp("Tu cuenta fue registrada con exito", ("Bienvenido " + name ));
        window.location.href = "/";
      }
    }else
    Alerts.alertPosiUp("error", "Selecciona un genero")
  };

  return (
    <>
      <section className="story section container">
        <div className="story__container grid">
          <div className="story__data">
            <h2 className="section__title story__section-title">Registrate</h2>
            <h1 className="story__title">Compras seguras y proteginas</h1>
            <p className="story__description">
              Crear una cuenta tiene muchos beneficios: Pago más rápido, guardar
              más de una dirección, seguimiento de pedidos y mucho más.
            </p>
            <Link className="button button--ligthB" to="/login">
              Iniciar sesión
            </Link>
          </div>

          <div className="story__images">
            <div className="card_login">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={mail}
                  id="aidi"
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Correo"
                  className="newsletter__input mt-1"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="newsletter__input mt-1"
                  required
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre"
                  className="newsletter__input mt-1"
                  required
                />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Apellidos"
                  className="newsletter__input mt-1"
                  required
                />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefono"
                  className="newsletter__input mt-1"
                  required
                />
                <Select
                  className="newsletter__input m-all_05"
                  options={listGender}
                  placeholder="Genero"
                  value={{ label: gender, value: gender }}
                  onChange={(e) => {
                    setGender(e.value);
                  }}
                />

                <div className="loading">
                  <button className="button home__button mt-1">
                    Crear cuenta
                  </button>
                </div>
              </form>
            </div>
            <div className="square_register"></div>
          </div>
        </div>
      </section>
    </>
  );
}
