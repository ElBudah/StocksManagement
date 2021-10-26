import React from "react";
import { Link } from "react-router-dom";
import '../styles/divs.css';
import '../styles/buttons.css';

function Menu(){
    return(
        <div className="menu">
            <Link to="/signup"><button>SignUp</button></Link>
            <p></p>
            <Link to="/signin"><button>SignIn</button></Link>
        </div>
    )
}

export default Menu;