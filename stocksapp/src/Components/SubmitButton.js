import React from "react";
import '../styles/buttons.css';
import { Formik, useFormik } from "formik";

function SubmitButton(props){
    return(
        <button type="submit" className="submit">{props.title}</button>
    )
}

export default SubmitButton;