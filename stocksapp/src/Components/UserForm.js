import React from "react";
import { Formik } from "formik";
import userSchema from "../Validation/UserValidation";
import SubmitButton from "./SubmitButton";

function UserForm(){

    return(
        <div>
            <Formik
            initialValues={{
                txtName: '',
                txtEmail: '',
                txtPass: '',
            }}
            validationSchema={userSchema}
            onSubmit={(values, actions) => {
                console.log(values);
                actions.resetForm({
                    values: {
                        txtName: '',
                        txtEmail: '',
                        txtPass: ''
                    }
                })  

            }}
            >
                { formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="txtName">Name</label>
                        <input type="text" id="txtName" onChange={formik.handleChange} value={formik.values.txtName}></input>
                        {formik.touched.txtName && formik.errors.txtName && ( 
                            <p>{formik.errors.txtName}</p>
                        )}
                        <label htmlFor="txtEmail">Email</label>
                        <input type="text" id="txtEmail" onChange={formik.handleChange} value={formik.values.txtEmail}></input>
                        {formik.touched.txtEmail && (<h2>Hello World</h2>)}
                        <label htmlFor="txtPass">Password</label>
                        <input type="text" id="txtPass" onChange={formik.handleChange} value={formik.values.txtPass}></input>

                        <input type="submit" value="Submit"></input>
                        
                    </form>
                )}

            </Formik>
        </div>
    )
}

export default UserForm;