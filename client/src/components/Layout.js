import { Outlet,Routes,Route,Link ,Router} from "react-router-dom";
import {  v4 as uuid } from 'uuid';
import '../css/Layout.css';



export const Layout = () => {
    return( 
    <div className="layout" > 
            <h1> Connect-4 </h1>
            <div className="links" >
                
                {  (window.location.pathname != '/') ? <Link className="link" to="/"> Mis juegos </Link> : null }
                {  (window.location.pathname != '/join' && window.location.pathname != '/grid') ? <Link className="link" to="/join"> Unirse a un juego </Link> : null }
                {  (window.location.pathname != '/history' ) ? <Link className="link" to="/history"> Historial de partidas </Link> : null } 
            </div>
            <div className="content">
                    <Outlet/>
            </div>
    </div>);

}

