import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from "./Controller/PrivateRoute";
import Home from "./Pages/Home";
import LoggedArea from "./Pages/LoggedArea";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function Routes(){
    return (
        <BrowserRouter>
            <Route component={Home} exact path="/" />
            <Route component={SignUp} path="/signup" />
            <Route component={SignIn} path="/signin" />
            <PrivateRoute component={LoggedArea} path="/logged" />
        
        </BrowserRouter>
    )
}

export default Routes;