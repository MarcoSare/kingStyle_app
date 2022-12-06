import logo from '../assets/imagenes/favicon.png'
import {useRef, useEffect, useState} from 'react';
import { useContext } from 'react';
import {ThemeContext} from '../App'
import {navItems} from "./NavItems";
import DropdownProducts from "./Dropdown";
import DropdownUser from "./DropdownUser";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function NavBar(){
    const Theme = useContext(ThemeContext)
    const refThemeButton = useRef(null)
    const refCartShop = useRef(null)
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const imp = ()=>{
        if(Theme.theme==="light"){
            Theme.setTheme("dark")    
            refThemeButton.current.classList.remove('bx-sun');
            refThemeButton.current.classList.add('bx-moon');
             //document.getElementById("boton").classList.remove('clase_css');
        }
        else{
            Theme.setTheme("light") 
            refThemeButton.current.classList.remove('bx-moon');
            refThemeButton.current.classList.add('bx-sun');
        }
        //Theme.setTheme((Theme.theme === "light"?"dark":"light"))
    }

    const showCar = () =>{
        //Theme.setCar((Theme.car)===false?true:false)
        window.location.href = ("/miCarrito")
    }
    const [dropdown, showDropdown] = useState(false);
    const [dropdown2, showDropdown2] = useState(false);


    const toSearch = () =>{
        navigate("/buscar/"+search);
    }

    return (
    <div>
        <header  className="header" id="header">
            <nav className="nav row">
                <a href="#" className="nav__logo">
                <img src={logo} alt=""  height="70" width="70"/>
                </a>
                
                <div className="nav__menu" id="nav-menu">
                    <ul className="nav__list">
                        {navItems.map(item => {
                            if(item.title === "Products"){
                                return (
                                    <li key={item.id} className={item.cName} onMouseEnter={() => showDropdown(true)} onMouseLeave={() => showDropdown(false)}>
                                        <Link to={item.path}>{item.title}</Link>
                                        {dropdown && <DropdownProducts />}
                                    </li>
                                );
                            }

                            return (
                                <li key={item.id} className={item.cName}>
                                    <Link to={item.path}>{item.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="nav__close" id="nav-close">
                        <i className='bx bx-x' ></i>
                    </div>
                </div>

                <div className="nav__search">
                    <form>
                        <input type="text"  onChange={(e) => setSearch(e.target.value)}></input>
                        <button className="button--search" onClick={() => toSearch()}>BUSCAR</button>
                    </form>
                </div>

                <div className="nav__btns">
                <div className="nav__user">
                        <Link to={"./reports"}><i className={'bx bxs-report bx-color'}></i></Link>
                    </div>
                    <div className="nav__user">
                        <i className={'bx bx-user bx-color'} onClick={() => (dropdown2? showDropdown2(false):showDropdown2(true))}></i>
                        {dropdown2 && <DropdownUser />}
                    </div>
                    
                    <i ref={refThemeButton} className={'bx change-theme ' + (Theme.theme === "light"?"bx-moon bx-color":"bx-sun bx-color") } onClick={imp}></i>

                    <div className="nav__shop">
                        <i ref={refCartShop} className='bx bx-shopping-bag bx-color' onClick={showCar}></i>
                    </div>

                    <div  className="nav__toggle" id="nav-toggle">
                        <i className='bx bx-grid-alt' ></i>
                    </div>
                </div>
            </nav>
        </header>
    </div>)
}