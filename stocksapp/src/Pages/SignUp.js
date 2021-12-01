import axios from 'axios';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Components/Logo';
import SubmitButton from '../Components/SubmitButton';
import userSchema from '../Validation/UserValidation';
import * as yup from 'yup';
import { Formik, Form, Field, useFormik } from 'formik';
import swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function SignUp() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(userSchema),
    });

    const onSubmitHandler = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/users/signup', data).then(response => {
            if (response.data.message == 1) {
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Email already in use',
                })
            } else if (response.data.message == 2) {
                swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'New user cadastrated!',
                })
            }

        })
        reset();
    };
    /* const formik = useFormik({
        initialValues: {
            txtName: '',
            txtEmail: '',
            txtPass: 0,
        },
        validationSchema: userSchema,
        onSubmit: (values, extras) => {
            console.log(values);
            axios.post('http://localhost:5000/users/signup', values).then(response => {
                if (response.data.message == 1) {
                    swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Email already in use',
                    })
                } else if (response.data.message == 2) {
                    swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'New user cadastrated!',
                    })
                }
                
            })
            extras.resetForm({
                values:{
                    txtName:'',
                    txtEmail: '',
                    txtPass: ''
                }
            })
        }
        
    }) */

    return (
        <Fragment>
            <Logo></Logo>
            <div className="menu">
                <h3>To create your account fill the blanks below:</h3>
                <div className="login">
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <input {...register("txtName")} placeholder="Name" type="text" />
                        <h4 className="error">{errors.txtName?.message}</h4>
                        <p></p>

                        <input {...register("txtEmail")} placeholder="Email" />
                        <h4 className="error">{errors.txtEmail?.message}</h4>
                        <p></p>

                        <input {...register("txtPass")} placeholder="Password" type='password' />
                        <h4 className="error">{errors.txtPass?.message}</h4>
                        <p></p>

                        <SubmitButton title="Sign Up"/>
                    </form>
                    <p></p>
                    <Link to="/"><button className="signin">Return</button></Link>
                </div>
            </div>
        </Fragment>
    )
}

export default SignUp;