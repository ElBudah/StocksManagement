import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Logo from "../Components/Logo";
import Menu from "../Components/Menu";
import '../styles/buttons.css';
import '../styles/divs.css';

function Home() {
    
    window.localStorage.clear();

    return (
        <Fragment>
            <Logo></Logo>
            <Menu></Menu>
        </Fragment>
    )
}

export default Home;