import React from "react";
import { Link } from "react-router-dom";
import '../styles/divs.css';
import '../styles/buttons.css';

function Menu(){
    return(
        <div className="menu">
            <p></p>
            <Link to="/signup"><button className="signup">SignUp</button></Link>
            <p></p>
            <Link to="/signin"><button className="signin">SignIn</button></Link>
        </div>
    )
}

export default Menu;