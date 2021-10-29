import React from "react";
import logo from '../img/small_money_bag.png';
import '../styles/divs.css'

function Logo(){
    return(
        <div className="logo">
            <h2>Money Lab<img src={logo} alt="logo" /></h2>
        </div>
    )
}

export default Logo