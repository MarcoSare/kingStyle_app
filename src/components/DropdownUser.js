import React, { useState } from "react";
import { userDropdown, sesionDropdown } from "./NavItems"
import { Link } from "react-router-dom"

function DropdownUser() {

    const [dropdown, setDropdown] = useState(false);
    const isSession = isSessionm()
    const token = localStorage.getItem("kingstyle_token")
    console.log(isSession)
    console.log(token)

    function isSessionm(){
        const token = localStorage.getItem("kingstyle_token")
        if(token===null)
        return false;
        else
        return true;
    }

    function logOut(){
        localStorage.removeItem('kingstyle_token');
        window.location.href = "/"
    }
    return <>

        <ul className={dropdown ? "nav__userMenu clicked" : "nav__userMenu"} onClick={() => setDropdown(!dropdown)}>
            {isSession?sesionDropdown.map(item => {
                console.log(item.cName)
                return (
                    <li key={item.id} className={item.cName}>
                        <Link to={item.path}
                        onClick={() => item.title==="Cerrar sesión"?logOut():setDropdown(false)}>
                        {item.title}
                        </Link>
                    </li>
                );
            }):userDropdown.map(item => {
                return (
                    <li key={item.id} className={item.cName}>
                        <Link to={item.path} onClick={() => setDropdown(false)}>{item.title}</Link>
                    </li>
                );
            })}
        </ul>
    </>;
}



export default DropdownUser;