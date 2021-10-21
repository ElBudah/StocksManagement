import React, { Component } from "react";
import { Route, Redirect} from 'react-router-dom';
import a from "./isLogin";


const PrivateRoute = ({component: Component, ...rest}) =>{
    return(

        <Route {...rest} render={props => (
            a() ? 
            <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;