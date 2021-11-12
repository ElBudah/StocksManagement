import React from "react";
import * as yup from 'yup';

const stockValidation = yup.object().shape({
    txtStock : yup.string().max(4,'Invalid ticker').required('You must enter a value'),
    nmbQuantity: yup.number('You must enter a number').integer('The number must an integer').positive('The number must be positive').required('You must enter a quantity'),
    nmbPriceBuy: yup.number('You must enter a number').positive('The number must be positive').required('You must enter a value'),
    nmbPriceSell: yup.number('You must enter a number').positive('The number must be positive').required('You must enter a value'),
    nmbQuantitySell: yup.number('You must enter a number').integer('The number must an integer').positive('The number must be positive').required('You must enter a quantity'),
})

export default stockValidation;