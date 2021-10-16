import axios from "axios";
import React, { useState } from "react";
import SubmitButton from "../Components/SubmitButton";

function SignUp() {
    const[user, setUser] = useState({
        txtName: '',
        txtEmail: '',
        txtPass: 0,
    })

    function formSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:5000/signup', user).then(response =>{
            if(response.data.message == 1){
                alert('Erro no cadastro do usuário! Tente novamente');
            }else if(response.data.message == 2){
                alert('Usuário cadastro com sucesso!');
            }
        })
    }

    function inputChange(event){
        user[event.target.name] = event.target.value;
        setUser(user);
        console.log(user);
    }


    return (
        <div>
            <h2>To create your account please enter your name, email and a password</h2>
            <form onSubmit={formSubmit}>
                Name:
                <input type="text" id="txtName" name="txtName" className="input" required autoComplete="off" onChange={inputChange}></input>
                <p></p>
                Email:
                <input type="email" id="txtEmail" name="txtEmail" className="input" required autoComplete="off" onChange={inputChange}></input>
                <p></p>
                Password: 
                <input type="password" id="txtPass" name="txtPass" className="input" required autoComplete="off" onChange={inputChange}></input>
                <p></p>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default SignUp;