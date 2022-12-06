import GraphicSells from "../components/GraphicSells";
import GraphicCustomers from "../components/GraphicCustomers";
import GraphicProducts from "../components/GraphicProducts";
import GraphicGeneral from "../components/GraphicGeneral";
import { useState } from "react";

export function Reports() {
  //Estado del contenido a mostrar
  const [category, setCategory] = useState("General");

  //Definir el contenido a mostrar en base al boton de reportes
  switch (category) {
    case "General":
      return (
        <>
          <main className="main">
            <section className="section">
              <div className="reports__container grid-container container">
                <div className="reports_contMenu">
                  <div className="reports__titlButtons">
                    <label>REPORTES</label>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button selected"
                      onClick={() => setCategory("General")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/1718/1718474.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE GENERAL
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Ventas")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/994/994649.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE VENTAS
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Clientes")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/3201/3201521.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE CLIENTES
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Productos")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/2203/2203183.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE PRODUCTOS
                    </button>
                  </div>
                </div>
                <div className="reports__contGraphics">
                  <div>
                    <label className="reports__title">REPORTE GENERAL</label>
                    <GraphicGeneral />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      );
      break;
    case "Ventas":
      return (
        <>
          <main className="main">
            <section className="section">
              <div className="reports__container grid-container container">
                <div className="reports_contMenu">
                  <div className="reports__titlButtons">
                    <label>REPORTES</label>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("General")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/1718/1718474.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE GENERAL
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button selected"
                      onClick={() => setCategory("Ventas")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/994/994649.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE VENTAS
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Clientes")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/3201/3201521.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE CLIENTES
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Productos")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/2203/2203183.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE PRODUCTOS
                    </button>
                  </div>
                </div>
                <div className="reports__contGraphics">
                  <div>
                    <label className="reports__title">REPORTE DE VENTAS</label>
                    <GraphicSells />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      );
      break;
    case "Clientes":
      return (
        <>
          <main className="main">
            <section className="section">
              <div className="reports__container grid-container container">
                <div className="reports_contMenu">
                  <div className="reports__titlButtons">
                    <label>REPORTES</label>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("General")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/1718/1718474.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE GENERAL
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Ventas")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/994/994649.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE VENTAS
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button selected"
                      onClick={() => setCategory("Clientes")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/3201/3201521.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE CLIENTES
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Productos")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/2203/2203183.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE PRODUCTOS
                    </button>
                  </div>
                </div>
                <div className="reports__contGraphics">
                  <div>
                    <label className="reports__title">
                      REPORTE DE CLIENTES
                    </label>
                    <GraphicCustomers />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      );
      break;
    case "Productos":
      return (
        <>
          <main className="main">
            <section className="section">
              <div className="reports__container grid-container container">
                <div className="reports_contMenu">
                  <div className="reports__titlButtons">
                    <label>REPORTES</label>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("General")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/1718/1718474.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE GENERAL
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Ventas")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/994/994649.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE VENTAS
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button"
                      onClick={() => setCategory("Clientes")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/3201/3201521.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE CLIENTES
                    </button>
                  </div>
                  <div className="reports__contButtons">
                    <button
                      className="reports__button selected"
                      onClick={() => setCategory("Productos")}
                    >
                      <img
                        className="reports__icon"
                        src="https://cdn-icons-png.flaticon.com/512/2203/2203183.png"
                        width="25px"
                        height="25px"
                      />
                      REPORTE PRODUCTOS
                    </button>
                  </div>
                </div>
                <div className="reports__contGraphics">
                  <div>
                    <label className="reports__title">
                      REPORTE DE PRODUCTOS
                    </label>
                    <GraphicProducts />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      );
      break;
  }
}
