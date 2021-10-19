import _default from "atob";
import React, {useState,useEffect} from "react";
import Logged from "./SignIn";
import {Link} from 'react-router-dom';


function LoggedArea(){
    const [stocks,setStocks] = useState({
        Name: '',
        Quantity: 0,
    })


    return(
        <div>
           <table>
                <tr>Teste</tr>
                <th>Teste th</th>
           </table>
           <Link to="/"><button>Loggout</button></Link>
        </div>
    )
}


export default LoggedArea;