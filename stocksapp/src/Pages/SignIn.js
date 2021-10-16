import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/buttons.css';
import '../styles/divs.css';
import '../styles/texts.css';

function Logged() {
    const [user, Setuser] = useState({
        txtName: "",
        txtEmail: "",
        txtPassword: 0,
    })

    function formSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/login', user).then(response => {
            if (response.data == 0) {

            } else {

            }
        })

    }

    function inputChange(event) {
        user[event.target.name] = event.target.value;
        Setuser(user);
        console.log(user);
    }

    return (
        <div className="main">
            <h2>To enter insert your credentials below: </h2>
            <div className="login">

                <form onSubmit={formSubmit}>
                    <h2>Name:
                        <input id="txtName" name="txtName" autoComplete="off" required onChange={inputChange} />
                    </h2>
                    <h2>Email:
                        <input id="txtEmail" type="email" name="txtEmail" autoComplete="off" required onChange={inputChange} />
                    </h2>
                    <h2>Password:
                        <input id="txtPass" type="password" name="txtPass" autoComplete="off" required onChange={inputChange}></input>
                    </h2>


                </form>

            </div>
            <div>
                <input type="submit" className="submit" value="Enter" />
            </div>

        </div>
    )
}

export default Logged;