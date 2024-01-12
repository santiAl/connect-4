import { Outlet,Routes,Route,Link ,Router} from "react-router-dom";
import {  v4 as uuid } from 'uuid';
import '../css/Layout.css';



export const Layout = () => {
    return( 
    <div className="layout" > 
            <h1> Connect-4 </h1>
            <div className="links" >
                    <Link className="link" to="/"> Home </Link>
                    <Link className="link" to="/join"> join </Link>
            </div>
            <div className="content">
                    <Outlet/>
            </div>
    </div>);

}

