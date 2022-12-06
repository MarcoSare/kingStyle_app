
import './styles.css'
import {useRef} from 'react';
import {Link, Route, Routes, useParams} from 'react-router-dom'
import { createContext, useState } from 'react';
import {NavBar} from './components/NavBar';
import {Footer} from './components/Footer';
import {Car} from './components/Car';
import {Home} from './views/Home'
import {Camisas} from './views/Camisas'
import {Pantalones} from './views/Pantalones'
import {Sacos} from './views/Sacos'
import {Trajes} from './views/Trajes'
import { Register } from './views/Register';
import { Login } from './views/Login';
import { ProductDetails } from './views/ProductDetails';
import { Perfil } from './views/Perfil';
import {Reports} from './views/Reports'
import { CarView } from './views/CarView';
import { SearchView } from './views/SearchView';
import { CheckOut } from './views/CheckOut';
import { Domicilio } from './views/Domicilio';
import { Factura } from './views/Factura';
import { GuiaTallas } from './views/GuiaTallas';

export const ThemeContext = createContext(null);

export const CarContext = createContext(null);

function App() {


  const [theme, setTheme] = useState("light")
  const [carContext, setCarContext] = useState(0)
  const [productsCar, setProductsCar] = useState([])
  const [car, setCar] = useState(false)
  return (
    <>
    <ThemeContext.Provider value={{theme, setTheme, car, setCar}}>
    <CarContext.Provider value={{carContext, setCarContext, productsCar, setProductsCar}}>
    <div  id={theme}>
    <NavBar/>
    <Car/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/camisas' element={<Camisas/>}/>
    <Route path='/pantalones' element={<Pantalones/>}/>
    <Route path='/sacos' element={<Sacos/>}/>
    <Route path='/trajes' element={<Trajes/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/perfil' element={<Perfil/>}/>
    <Route path='/reports' element={<Reports/>}/>
    <Route path='/miCarrito' element={<CarView/>}/>
    <Route path='/producto/:sku' element={<ProductDetails/>}/>
    <Route path='/buscar/:params' element={<SearchView/>}/>
    <Route path='/checkout' element={<CheckOut/>}/>
    <Route path='/domicilio' element={<Domicilio/>}/>
    <Route path='/domicilio/:id' element={<Domicilio/>}/>
    <Route path='/factura' element={<Factura/>}/>
    <Route path='/guiaTallas' element={<GuiaTallas/>}/>
    </Routes>
    <Footer/>
    </div>
    </CarContext.Provider>
    </ThemeContext.Provider>
    </>
  );
}


export default App;
