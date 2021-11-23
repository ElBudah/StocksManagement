import React from "react";
import { Formik, Field, Form } from "formik";
import userSchema from "../Validation/UserValidation";
import SubmitButton from "./SubmitButton";

function UserFormNew() {
    return (
        <div>
            <Formik
                initialValues={{
                    txtName: '',
                    txtEmail: '',
                    txtPass: '',
                }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    actions.resetForm({
                        values: {
                            txtName: '',
                            txtEmail: '',
                            txtPass: ''
                        },
                    })

                }}
                
                validationSchema={userSchema}
            >
                {({errors}) => (
                    <Form>
                        <div>
                            <label htmlFor="txtName">Name</label>
                            <Field  name="txtName" type="text" id="txtName"></Field>
                            {errors.txtName && (
                                <h4 className="error">{errors.txtName}</h4>
                            )}
                            <label htmlFor="txtEmail" >Email</label>
                            <Field name="txtEmail" type="text" id="txtEmail"></Field>
                            {errors.txtEmail && (
                                <h4 className="error">{errors.txtEmail}</h4>
                            )}
                            <label htmlFor="txtPass">Password</label>
                            <Field name="txtPass" type="text" id="txtPass" ></Field>
                            {errors.txtPass && (
                                <h4 className="error">{errors.txtPass}</h4>
                            )}
                        </div>
                        <SubmitButton/>
                    </Form>
                )}

            </Formik>

        </div>
    )
}

export default UserFormNew;