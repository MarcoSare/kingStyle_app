import auth from "../auth/auth";
const baseUrl = process.env.REACT_APP_API_ROUTE;

/*
 const data = await fetch(apiRoute+'producto_categoria/'+categoria)
        .then((response) => response.json())
        console.log(data)
*/

const getCar = async (token) => {
  if (token === null) token = auth.getToken();
  const data = await fetch(baseUrl + "car", {
    headers: {
      authorization: token,
    },
  }).then((response) => response.json());
  return data;
};

const addCar = async (token, producto, cantidad, talla) => {
  console.log("hola");
  console.log(token);
  console.log(cantidad);
  const body = {
    producto: producto,
    cantidad: cantidad,
    talla: talla,
  };
  console.log(body);
  const data = await fetch(baseUrl + "car", {
    method: "POST",

    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      console.log(response);
      console.log("efsd");
    })
    .catch((err) => err);
  console.log("fgdrfg");
  return data;
};

const deleteToCar = async (token, producto) => {
  if (token === null) token = auth.getToken();
  console.log(token);
  const body = {
    producto: producto,
  };
  console.log(body);
  const data = await fetch(baseUrl + "car", {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response)
    .catch((err) => err);
  console.log("fgdrfg");
  return data;
};

const deleteAllCar = async () => {
 const token = auth.getToken();
  console.log(token);
  const data = await fetch(baseUrl + "carAll", {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response)
    .catch((err) => err);
  console.log("fgdrfg");
  return data;
};



const quantityCar = async (producto, cantidad, talla, _id) => {
  const token = auth.getToken();
  console.log("hola");
  console.log(token);
  const body = {
    _id: _id,
    producto: producto,
    cantidad: cantidad,
    talla: talla,
  };
  const data = await fetch(baseUrl + "car/cantidad", {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response)
    .catch(console);
  return data;
};

const quantityLocalCar = async (producto, cantidad, talla) => {
  console.log(cantidad);
  const body = {
    producto: producto,
    cantidad: cantidad,
    talla: talla,
  };
  const data = await fetch(baseUrl + "car/veriCantidad", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response)
    .catch(console);
  return data;
};

const localCar = async (p) => {
  const data = await fetch(baseUrl + "localCar", {
    method: "POST",
    body: JSON.stringify({
      products: p,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response)
    .catch(console);
  console.log(data);
  return data;
};

export default {
  addCar,
  deleteToCar,
  getCar,
  quantityCar,
  localCar,
  quantityLocalCar,
  deleteAllCar
};

/*
axios.get(`${baseURL}/asdf`).then((response) => {
      setPost(response.data);
    }).catch(error => {
      setError(error);
    });
    
*/
