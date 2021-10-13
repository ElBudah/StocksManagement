import React, { useEffect, useState } from "react";
import axios from 'axios';

function Home() {

    const[user,Setuser] = useState({
        txtName : "",
        txtPassword: ""
    })

    function formSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:5000/login', user).then(response =>{
            if(response.data == 0){
                
            }else{

            }
        })

    }

    function inputChange(event){
        user[event.target.name] = event.target.value;
        Setuser(user);
        console.log(user);
    }

    return (
        <div>
            <h2>To start, make your loggin bellow</h2>
            <form onSubmit={formSubmit}>
                <fieldset>

                    <h2>Name:
                        <input id="txtName" name="txtName" autoComplete="off" required  onChange={inputChange}/>
                    </h2>
                    <h2>Password:
                        <input id="txtPassword" type="password" name="txtPassword" autoComplete="off" required  onChange={inputChange}/>
                    </h2>
                    <input type="submit" value="Submit"/>
                </fieldset>
            </form>
        </div>
    )
}

export default Home;