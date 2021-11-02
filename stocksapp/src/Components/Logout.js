import React from "react";
import {Link} from 'react-router-dom';

function Logout(){
    return(
        <Link to="/"><button>Logout</button></Link>
    )

}

export default Logout;