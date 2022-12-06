import { useRef, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const apiRoute = process.env.REACT_APP_API_ROUTE

export const Perfil = () =>{
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    
    useEffect(() =>{
        isSession()
    },[])

    const getUser = async (token) => {
        const data = await fetch(apiRoute + "getUser", {
            headers: {
                'authorization': token,
              },
        }).then((response) =>
          response.json()
        );
        console.log(data);
        setUser(data);
      };

    function isSession(){
        const token = localStorage.getItem("kingstyle_token")
        if(token===null){
            navigate("/");
            console.log("hola")
        }
       
        else{
            console.log("fdfg")
            getUser(token)
            return true;       
        }
     
    }
    
    return(
        <>
         <main className="main">
            <section className="story section container">
                <div className="perfil__container">
               <div>
               <h2>Mi perfil</h2>
              
                
                <div className="perfil__card mb_1">
                <div className="div__photo__perfil">
                <img src="https://comunidades.cepal.org/estadisticas-ambientales/sites/eambientales/files/users/pictures/1024px-User-avatar.svg__0.png" 
                className="photo__perfil"/>
                </div>
                
                <h2>{user.name + " " +user.lastname}</h2>
                </div>


                <div className="perfil__card">

                </div>
                <div className="perfil__card">

                </div>
                <div className="perfil__card">

                </div>
                <div className="perfil__card">

                </div>

                </div>
                </div>
                
            </section>
         </main>
        </>
    )
}