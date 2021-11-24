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
import SubmitButton from "../Components/SubmitButton";
import swal from 'sweetalert2';

function Logged() {

    function test(){
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
    const formik = useFormik({
        initialValues: {
            txtName: '',
            txtEmail: '',
            txtPass: 0,
        },
        validationSchema: userSchema,
        onSubmit: (values, actions) => { 
            console.log(values);
            axios.post('http://localhost:5000/signin', values).then(response => {
                if (response.data !== 'error') {
                    window.localStorage.setItem('token', 1);
                } else {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                      })
                }
                window.location = '/addstock';
            })
            actions.resetForm({
                values: {
                    txtPass: '',
                    txtEmail: '',
                    txtName: ''
                }
            })
        }
    })
    return (
        <Fragment>
            <Logo></Logo>
            <div className="menu">
                <h3>To enter insert your credentials below: </h3>
                <div className="login">
                    <form onSubmit={formik.handleSubmit} >
                        <label htmlFor="txtName" className="label">*Name:</label>
                        <input id="txtName" name="txtName" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange} values={formik.values.txtName} />
                        {formik.touched.txtName && formik.errors.txtName ? <h4 className="error">{formik.errors.txtName}</h4> : null}
                        <p></p>
                        <label htmlFor="txtEmail" className="label">*Email:</label>
                        <input id="txtEmail" type="email" name="txtEmail" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange} values={formik.values.txtEmail} />
                        {formik.touched.txtEmail && formik.errors.txtEmail ? <h4 className="error">{formik.errors.txtEmail}</h4> : null}
                        <p></p>
                        <label htmlFor="txtPass" className="label">*Password:</label>
                        <input id="txtPass" type="password" name="txtPass" autoComplete="off" onBlur={formik.handleBlur} onChange={formik.handleChange} values={formik.values.txtPass}></input>
                        {formik.touched.txtPass && formik.errors.txtPass ? <h4 className="error">{formik.errors.txtPass}</h4> : null}
                        <p></p>
                        <SubmitButton title="Enter" ></SubmitButton>
                    </form>
                    <p></p>
                    <Link to="/"><button className="signin">Return</button></Link>
                </div>

                <button onClick={test}></button>
            </div>
        </Fragment>
    )
}

export default Logged;