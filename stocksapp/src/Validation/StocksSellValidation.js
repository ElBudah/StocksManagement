import React from "react";
import * as yup from 'yup';

const StocksSellValidation = yup.object().shape({
    nmbPriceSell: yup.number().positive('The number must be positive').nullable().transform((v, o) => o === '' ? null : v).typeError('You must enter a number'),
    nmbQuantitySell: yup.number().positive('The number must be positive').integer('The numer must be integer').nullable().transform((v, o) => o === '' ? null : v).typeError('You must enter a number'),
})

export default StocksSellValidation;