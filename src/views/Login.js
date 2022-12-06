import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  loginService  from "../services/loginService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const labEmailRef = useRef(null);
  const labPassRef = useRef(null);

  const veriPass = (pass) => {
    setEmail(pass);
    console.log("sdfsdf");
    if (
      pass.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) ||
      pass === ""
    ) {
      emailRef.current.classList.remove("newsletter__input__invalid");
      emailRef.current.classList.add("newsletter__input");
      labEmailRef.current.style.display = "none";
    } else {
      emailRef.current.classList.remove("newsletter__input");
      emailRef.current.classList.add("newsletter__input__invalid");
      labEmailRef.current.style.display = "flex";
      labEmailRef.current.innerHTML = "Ingresa un correo valido"
    }
  };

  const changePass = (value) =>{
    setPassword(value)
    passRef.current.classList.remove("newsletter__input__invalid");
    passRef.current.classList.add("newsletter__input");
    labPassRef.current.style.display = "none";
  }

  const UserNotFound = () =>{
    emailRef.current.classList.remove("newsletter__input");
    emailRef.current.classList.add("newsletter__input__invalid");
    labEmailRef.current.style.display = "flex";
    labEmailRef.current.innerHTML = "User not found"
  }

  const PassWrong = () =>{
    passRef.current.classList.remove("newsletter__input");
    passRef.current.classList.add("newsletter__input__invalid");
    labPassRef.current.style.display = "flex";
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
        const user = await loginService.login(email,password)
        console.log(user)
        if(user.status===200){
            const d = await user.json()
            localStorage.setItem('kingstyle_token', d.token);
            window.location.href ="/"
        }else{
            if(user.status===400){
                const d = await user.json()
                if(d.message_error==='User not found')
                UserNotFound()
                else
                if(d.message_error==='Password is wrong')
                PassWrong()

            }else{
                console.log("error inesperado")
            }
        }
    }
    catch(error){
        console.log(error)
    }
  }

  return (
    <>
      <section className="story section container">
        <div className="story__container grid">
          <div className="story__data">
            <h2 className="section__title story__section-title">
              Iniciar sesión
            </h2>
            <h1 className="story__title">Compras seguras y proteginas</h1>
            <p className="story__description">
              Inicia sesión para muchos beneficios: Pago más rápido, guardar más
              de una dirección, seguimiento de pedidos y mucho más.
            </p>
            <Link className="button button--ligthB" to="/register">
              Crea tu cuenta
            </Link>
          </div>

          <form className="story__images" onSubmit={handleLogin}>
            <div className="card_login">
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Correo"
                className="newsletter__input mt-1"
                required
                onChange={(e) => veriPass(e.target.value)}
              />

              <label ref={labEmailRef} className="label__error">
                Ingresa un correo valido
              </label>
              <input
                ref={passRef}
                type="password"
                placeholder="Contraseña"
                className="newsletter__input mt-1"
                required
                onChange={(e) => changePass(e.target.value)}
              />
              <label ref={labPassRef} className="label__error">
                Contraseña incorrecta
              </label>
              <div className="loading">
                <button className="button home__button mt-1">
                  Iniciar sesión
                </button>
              </div>
            </div>
            <div className="story__square"></div>
          </form>
        </div>
      </section>
    </>
  );
};
