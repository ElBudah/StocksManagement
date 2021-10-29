import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/buttons.css';
import '../styles/divs.css';
import '../styles/texts.css';
import Logo from "../Components/Logo";
import { Fragment } from "react/cjs/react.production.min";

function Logged() {
    const [user, Setuser] = useState({
        txtName: '',
        txtEmail: '',
        txtPass: 0,
    })

    function formSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/signin', user).then(response => {
            if (response.data !== 'error') {
                window.localStorage.setItem('token', 1);
            } else {
                alert('Credenciais inválidas');
            }
            window.location = '/addstock';
        })

    }

    function inputChange(event) {
        user[event.target.name] = event.target.value;
        Setuser(user);
        console.log(user);
    }

    return (
        <Fragment>
            <Logo></Logo>
            <div className="menu">
                <h3>To enter insert your credentials below: </h3>
                <div className="login">
                    <form onSubmit={formSubmit}>
                        <h3>Name:
                            <input id="txtName" name="txtName" autoComplete="off" required onChange={inputChange} />
                        </h3>
                        <h3>Email:
                            <input id="txtEmail" type="email" name="txtEmail" autoComplete="off" required onChange={inputChange} />
                        </h3>
                        <h3>Password:
                            <input id="txtPass" type="password" name="txtPass" autoComplete="off" required onChange={inputChange}></input>
                        </h3>
                        <input type="submit" className="submit" value="Enter" />
                    </form>
                    <p></p>
                    <Link to="/"><button className="signin">Return</button></Link>
                </div>

            </div>
        </Fragment>
    )
}

export default Logged;