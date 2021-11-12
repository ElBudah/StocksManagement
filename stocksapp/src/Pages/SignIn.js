import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/buttons.css';
import '../styles/divs.css';
import '../styles/texts.css';
import Logo from "../Components/Logo";
import { Fragment } from "react/cjs/react.production.min";
import { useFormik } from "formik";
import userSchema from "../Validation/UserValidation";

function Logged() {
    /* const [user, Setuser] = useState({
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
            axios.post('http://localhost:5000/signin', values).then(response => {
                if (response.data !== 'error') {
                    window.localStorage.setItem('token', 1);
                } else {
                    alert('Credenciais inválidas');
                }
                window.location = '/addstock';
            })

        }
        
    })

    return (
        <Fragment>
            <Logo></Logo>
            <div className="menu">
                <h3>To enter insert your credentials below: </h3>
                <div className="login">
                    <form onSubmit={formik.handleSubmit}  >
                        <label htmlFor="txtName" className="label">*Name:</label>
                        <input id="txtName" name="txtName" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.txtName && formik.errors.txtName ? <h4 className="error">{formik.errors.txtName}</h4> : null}
                        <p></p>
                        <label htmlFor="txtEmail" className="label">*Email:</label>
                        <input id="txtEmail" type="email" name="txtEmail" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.txtEmail && formik.errors.txtEmail ? <h4 className="error">{formik.errors.txtEmail}</h4> : null}
                        <p></p>
                        <label htmlFor="txtPass" className="label">*Password:</label>
                        <input id="txtPass" type="password" name="txtPass" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                        {formik.touched.txtPass && formik.errors.txtPass ? <h4 className="error">{formik.errors.txtPass}</h4> : null}
                        <p></p>
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