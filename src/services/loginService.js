const baseUrl = process.env.REACT_APP_API_ROUTE+"login"

/*
 const data = await fetch(apiRoute+'producto_categoria/'+categoria)
        .then((response) => response.json())
        console.log(data)
*/
const login = async (mail, password) =>{
    const body={
        "mail": `${mail}`,
        "password":`${password}`
    }
    const data =  await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response)
    .catch(console);
    return data;
}

const suma = (a,b) =>{
    let r = a+b;
    console.log(r)
}
export default {login,suma}

/*
axios.get(`${baseURL}/asdf`).then((response) => {
      setPost(response.data);
    }).catch(error => {
      setError(error);
    });
    
*/