import axios from "axios";
import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";
import SubmitButton from "../Components/SubmitButton";
import userSchema from "../Validation/UserValidation";
import * as yup from 'yup';
import { Formik, Form, Field, useFormik } from "formik";


function SignUp() {
    /* const [user, setUser] = useState({
        txtName: '',
        txtEmail: '',
        txtPass: 0,
    })

    const formSubmit = async (event) => {
        event.preventDefault();

        console.log('entrou aqui');
        const isValid = await userSchema.isValid(user);
        console.log("Is valid: " + isValid);

        if (isValid) {
            axios.post('http://localhost:5000/signup', user).then(response => {
                if (response.data.message == 1) {
                    alert('Endereço de email já em uso. Tente novamente');
                } else if (response.data.message == 2) {
                    alert('Usuário cadastro com sucesso!');
                }
            })
        }
    }

    function inputChange(event) {
        user[event.target.name] = event.target.value;
        setUser(user);
        console.log(user);
    } */

    const formik = useFormik({
        initialValues: {
            txtName: '',
            txtEmail: '',
            txtPass: 0,
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values.txtName);
            axios.post('http://localhost:5000/signup', values).then(response => {
                if (response.data.message == 1) {
                    alert('Endereço de email já em uso. Tente novamente');
                } else if (response.data.message == 2) {
                    alert('Usuário cadastro com sucesso!');
                }
            })
        }
        
    })

    return (
        <Fragment>
            <Logo></Logo>
            <div className="menu">
                <h3>To create your account fill the blanks below:</h3>
                <div className="login">
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="txtName" className="label">*Name:</label>
                        <input type="text" id="txtName" name="txtName" className="input" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                        {formik.touched.txtName && formik.errors.txtName ? <h4 className="error">{formik.errors.txtName}</h4>:null }
                        <p></p>
                        <label htmlFor="txtEmail" className="label">*Email:</label>
                        <input type="email" id="txtEmail" name="txtEmail" className="input" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                        {formik.touched.txtEmail && formik.errors.txtEmail ? <h4 className="error">{formik.errors.txtEmail}</h4>:null }
                        <p></p>
                        <label htmlFor="txtPass" className="label">*Password: </label>
                        <input type="password" id="txtPass" name="txtPass" className="input" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                        {formik.touched.txtPass && formik.errors.txtPass ? <h4 className="error">{formik.errors.txtPass}</h4>:null }
                        <p></p>
                        <SubmitButton></SubmitButton>
                    </form>
                    <p></p>
                    <Link to="/"><button className="signin">Return</button></Link>
                </div>
            </div>
        </Fragment>
    )
}

export default SignUp;