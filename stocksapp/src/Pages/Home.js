import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/buttons.css';
import '../styles/divs.css';

function Home() {
    return (
        <Fragment>
            <div className="homepage">
                <Link to="/signup"><button >Sign Up</button></Link>
                <p></p>
                <Link to="/signin"><button >Sign In</button></Link>
            </div>
            <div className="photo">
                <img src="../img/goldenbull.jpg" alt="bull"></img>
            </div>
        </Fragment>
    )
}

export default Home;