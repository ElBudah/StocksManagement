import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Menu from "../Components/Menu";
import '../styles/buttons.css';
import '../styles/divs.css';

function Home() {
    return (
        <Fragment>
            <Menu></Menu>
            <div className="photo">
                <img  alt="bull"></img>
            </div>
        </Fragment>
    )
}

export default Home;