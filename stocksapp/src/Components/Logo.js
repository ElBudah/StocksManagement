import React from "react";
import { Link } from "react-router-dom";
import logo from '../img/small_money_bag.png';
import '../styles/divs.css'

function Logo(){
    return(
        <div className="logo">
            <Link to="/" style={{textDecoration:"none"}}><h2>Money Lab<img src={logo} alt="logo" /></h2></Link>
        </div>
    )
}

export default Logo