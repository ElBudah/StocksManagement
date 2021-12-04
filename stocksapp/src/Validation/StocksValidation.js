import React from "react";
import * as yup from 'yup';

const stockValidation = yup.object().shape({
    txtStock : yup.string().max(6,'Invalid ticker').required('You must enter a value'),
    nmbQuantity: yup.number().integer('The number must an integer').positive('The number must be positive').required('You must enter a quantity'),
    nmbPriceBuy: yup.number().positive('The number must be positive').required('You must enter a value'),
    nmbPriceSell: yup.number().positive('The number must be positive').integer('The numer must be integer').nullable().transform((v, o) => o === '' ? null : v),
    nmbQuantitySell: yup.number().positive('The number must be positive').integer('The numer must be integer').nullable().transform((v, o) => o === '' ? null : v),
})

export default stockValidation;