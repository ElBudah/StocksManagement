import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/divs.css';
import axios from "axios";
import Text from "../Components/Text";
import SubmitButton from "../Components/SubmitButton";
import { Fragment } from "react/cjs/react.production.min";
import Menu from "../Components/Menu";
import '../styles/table.css';
import '../styles/texts.css';
import Logo from "../Components/Logo";
import { Formik, useFormik } from "formik";
import stockValidation from "../Validation/StocksValidation";
import swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";



function LoggedArea() {
    const [stocks, setStocks] = useState([]);

    function clear() {
        window.localStorage.clear();
    }

    const clock = 200;
    useEffect(() => {
        const id = setInterval(() => {
            axios.get('http://localhost:5000/show/stocks').then(response => {
                setStocks(response.data);
            
            }).catch(err => {
                console.log(err);
            })
        }, clock);
        return () => clearInterval(id);
    }, [stocks]);


    function erasedata() {
        axios.delete('http://localhost:5000/erase/stocks').then(response => {
            swal.fire({
                icon: 'info',
                text: 'All data has been deleted',
                title: 'Erased'
            })
        })

    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(stockValidation),
    })

    const onSubmit = (data) => {
        console.log(data);
        axios.post('http://localhost:5000/newstock/addstock', data).then(response => { 
        })
        swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'A new stock has been added!'
        })
        reset();
    }
    /* const stocksformik = useFormik({
        initialValues: {
            txtStock: '',
            nmbQuantity: 0,
            nmbPriceBuy: 0,
            nmbPriceSell: 0,
            nmbQuantitySell: 0,
        },
        validationSchema: stockValidation,
        onSubmit: values => {
            console.log(values.nmbPriceBuy);
            axios.post('http://localhost:5000/newstock/addstock', values).then(response => {
                alert('Success!');
            })
        },

    }) */

    return (
        <Fragment>
            <Logo></Logo>
            <div className="table">
                <table className="stocks" >
                    <tr>
                        <th>ID</th>
                        <th>StockName</th>
                        <th>QuantityBought</th>
                        <th>PriceBought</th>
                        <th>PriceSold</th>
                        <th>QuantitySold</th>
                        <th>Profit($)</th>
                        <th>Profit(%)</th>
                    </tr>
                    <td className="ids">{stocks.map(stock => <tr>{stock.ID}</tr>)}</td>
                    <td className="stocks">{stocks.map(stock => <tr>{stock.Ativo}</tr>)}</td>
                    <td className="qb">{stocks.map(stock => <tr>{stock.Quantity}</tr>)}</td>
                    <td className="pb">{stocks.map(stock => <tr>{stock.PriceBought}</tr>)}</td>
                    <td className="ps">{stocks.map(stock => <tr>{stock.PriceSold}</tr>)}</td>
                    <td className="qs">{stocks.map(stock => <tr>{stock.QuantitySold}</tr>)}</td>
                    <td className="pn">{stocks.map(stock => <tr>{stock.ProfitNeat}</tr>)}</td>
                    <td className="pp">{stocks.map(stock => <tr>{stock.ProfitPerc}</tr>)}</td>
                </table>
            </div>
            <div className="menu">
                <div className="inputs">
                    <h3 className="stocktext">Inser below your new stock to your list </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input autoComplete="off" placeholder="Stock Name*" {...register('txtStock')} />
                        <h4 className="error">{errors.txtStock?.message}</h4>
                        <p></p>
                        <input autoComplete="off" placeholder="Quantity Bought*" {...register('nmbQuantity')} />
                        <h4 className="error">{errors.nmbQuantity?.message}</h4>
                        <p></p>
                        <input autoComplete="off" placeholder="Price Bought*" {...register('nmbPriceBuy')} />
                        <h4 className="error">{errors.nmbPriceBuy?.message}</h4>
                        <p></p>
                        <input autoComplete="off" placeholder="Price Sold" {...register('nmbPriceSell')} />
                        <h4 className="error">{errors.nmbPriceSell?.message}</h4>
                        <p></p>
                        <input autoComplete="off" placeholder="Quantity Sold" {...register('nmbQuantitySell')} />
                        <h4 className="error">{errors.nmbQuantitySell?.message}</h4>
                        <p></p>
                        <SubmitButton title="Submit " />
                    </form>
                </div>
                <p></p>
                <Link to="/soldstock"><button>Sell Stock</button></Link>
                <p></p>
                <Link to="/calculate"><button>Calculate Profits</button></Link>
                <p></p>
                <button className="erase" onClick={erasedata}>Erase all data</button>
                <p></p>
                <Link to="/"><button onClick={clear}>Loggout</button></Link>
            </div>
        </Fragment>
    )
}

export default LoggedArea;