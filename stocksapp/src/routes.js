import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from "./Controller/PrivateRoute";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function Routes(){
    return (
        <BrowserRouter>
            <Route component={Home} exact path="/" />
            <Route component={SignUp} path="/signup" />
            <PrivateRoute component={SignIn} path="/signin" />
        
        </BrowserRouter>
    )
}

export default Routes;