import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/buttons.css';
import '../styles/divs.css';
import '../styles/texts.css';
import Logo from "../Components/Logo";
import { Fragment } from "react/cjs/react.production.min";
import { ErrorMessage, useFormik } from "formik";
import userSchema from "../Validation/UserValidation";
import SubmitButton from "../Components/SubmitButton";
import swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';


function Logged() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(userSchema),
    });

    const onSubmitHandler = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/users/signin', data).then(response => {
            if (response.data !== 'error') {
                window.localStorage.setItem('token', 1);
                window.location = '/addstock';
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid credentials',
                })
            }
        })
        reset();
    };



    /* const {register, handleSubmit, reset , errors} = useForm({
        mode: "onBlur",
        validationSchema: userSchema
    });
    const onSubmit = (data) => {
        console.log(data);
        reset();
        swal.fire({
            icon: 'success',
            title: 'This is a fine title',
            text: 'this is a fine text'
        })
    } */
    //###########################################//

    /* const formik = useFormik({
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
                    window.location = '/addstock';
                } else {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Invalid credentials',
                    })
                }
            })       
        }
    }) */
    return (
        <Fragment>
            <Logo></Logo>
            <div className="menu">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Login</h2>
                    <p></p>

                    <input {...register("txtName")} placeholder="Name" type="text" />
                    <h4 className="error">{errors.txtName?.message}</h4>
                    <p></p>

                    <input {...register("txtEmail")} placeholder="Email"/>
                    <h4 className="error">{errors.txtEmail?.message}</h4>
                    <p></p>

                    <input {...register("txtPass")} placeholder="Password" type='password'/>
                    <h4 className="error">{errors.txtPass?.message}</h4>
                    <p></p>

                    <SubmitButton title="Sign In" ></SubmitButton>
                </form>
                {/*  <h3>To enter insert your credentials below: </h3>
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
                    <p></p> */}
                     <p></p>
                <Link to="/"><button className="signin">Return</button></Link>
                {/* </div> */}
            </div>
        </Fragment>
    )
}

export default Logged;