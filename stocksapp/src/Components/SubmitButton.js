import React from "react";
import '../styles/buttons.css';
import { Formik, useFormik } from "formik";

function SubmitButton(){
    return(
        <button type="submit" className="submit">Submit</button>
    )
}

export default SubmitButton;