import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from "./Controller/PrivateRoute";
import Home from "./Pages/Home";
import Logged from "./Pages/Logged";

function Routes(){
    return (
        <BrowserRouter>
            <Route component={Home} exact path="/" />
            <PrivateRoute component={Logged} path="/logged" />
        
        </BrowserRouter>
    )
}

export default Routes;