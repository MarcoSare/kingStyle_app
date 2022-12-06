import {ContainerProducto} from '../components/ContainerProducto'
import { useParams } from "react-router-dom";
export function SearchView(){
    const { params } = useParams();
    const search = "BUSCAR " + params
    return(
        <>
        <ContainerProducto categoria={search}/>
        </>
    )
}