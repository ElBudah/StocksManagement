import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import Logo from "../Components/Logo";
import SubmitButton from "../Components/SubmitButton";
import swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import '../styles/buttons.css';
import StocksSellValidation from "../Validation/StocksSellValidation";

function SoldStock() {
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
            });
        }, clock);
        return () => clearInterval(id);
    }, [stocks]);

    // Logic to sell stocks ########### //

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(StocksSellValidation)
    });

    const onSubmitHandler = (sell) => {
        axios.post('http://localhost:5000/sell/sellstocks', sell).then(response => {
        })
        swal.fire({
            icon: 'sucess',
            title: 'Success',
            text: 'Your sell information has been added'
        });
        reset();
    };


    // Logic to automatically calculte de profits

    /* const clockProfit = 1000;
     useEffect(() => {
        const idprofit = setInterval(() => {
            axios.get('http://localhost:5000/auto/profitStocks').then(res => {
            }).catch(err => {
                console.log(err);
            })
        }, clockProfit);
        return () => clearInterval(idprofit);
    }, [stocks]);  */ 

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
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h3 className="stocktext">Select the stock ID you want to register <br></br> your sell and fill the blanks </h3>
                    <select className="sellid" {...register('idselected')}>
                        <option value="0" >IDs available</option>
                        {stocks.map(stock => <option key={stock.ID}>{stock.ID}</option>)}
                    </select>
                    <p></p>
                    <input {...register('nmbPriceSell')} placeholder="Price Sold*" autoComplete="off" />
                    <h4 className="error">{errors.nmbPriceSell?.message}</h4>
                    <p></p>
                    <input {...register('nmbQuantitySell')} placeholder="Quantity Sold*" autoComplete="off" />
                    <h4 className="error">{errors.nmbQuantitySell?.message}</h4>
                    <p></p>
                    <SubmitButton title="Submit" />
                </form>
                <p></p>
                <Link to="/calculate"><button>Calculate Profits</button></Link>
                <p></p>
                <Link to='/AddStock'><button>Add Stocks</button></Link>
                <p></p>
                <Link to="/"><button>Logout</button></Link>
            </div>
        </Fragment>
    )
}

export default SoldStock;