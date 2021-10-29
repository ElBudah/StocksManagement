import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from "./Controller/PrivateRoute";
import Home from "./Pages/Home";
import AddStock from "./Pages/AddStock";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SoldStock from "./Pages/SoldStocks";

function Routes(){
    return (
        <BrowserRouter>
            <Route component={Home} exact path="/" />
            <Route component={SignUp} path="/signup" />
            <Route component={SignIn} path="/signin" />
            <PrivateRoute component={AddStock} path="/addstock" />
            <PrivateRoute component={SoldStock} path="/soldstock" />
        </BrowserRouter>
    )
}

export default Routes;