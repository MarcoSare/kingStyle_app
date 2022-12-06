import React, { useState } from "react";
import {productsDropdown} from "./NavItems"
import {Link} from "react-router-dom"

function DropdownProducts(){
    const [dropdown, setDropdown] = useState(false);
    return<>
        <ul className={dropdown ? "nav__productsMenu clicked" : "nav__productsMenu"} onClick={() => setDropdown(!dropdown)}>
            {productsDropdown.map(item => {
                return (
                    <li key={item.id} className={item.cName}>
                        <div>
                            <Link to={item.path} onClick={() => setDropdown(false)}><img className="icon-products" src={item.lIcon} width="25px" height="25px"/> {item.title}</Link>
                        </div>
                    </li>
                );
            })}
        </ul>
    </>;
}

export default DropdownProducts;