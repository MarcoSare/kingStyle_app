import auth from "../auth/auth";
const baseUrl = process.env.REACT_APP_API_ROUTE;


const getDescuento = async (cupon) => {
    const body = {
        cod_cupon : cupon
    }
  const data = await fetch(baseUrl + "cupon", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
  return data;
};

  




export default {
  getDescuento
};


