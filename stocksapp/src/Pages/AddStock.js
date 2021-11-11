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
import { useFormik } from "formik";


function LoggedArea() {
    const [stocks, setStocks] = useState([]);

    function clear() {
        window.localStorage.clear();
    }

    const clock = 50;
    useEffect(() => {
        const id = setInterval(() => {
            axios.get('http://localhost:5000/logged/stocks').then(response => {
                setStocks(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })
        }, clock);
        return () => clearInterval(id);
    }, [stocks]);


    function erasedata() {
        axios.delete('http://localhost:5000/erase/stocks').then(response => {
            alert('The stocks data has been erased');
        })

    }
    // Insert new data (stocks) into database

    const [stocksAdd, setStocksAdd] = useState({
        txtStock: '',
        nmbQuantity: 0,
        nmbPriceBuy: 0,
        nmbPriceSell: 0,
        nmbQuantitySell: 0,
    })

    function handleInputChange(event) {
        stocksAdd[event.target.name] = event.target.value;
        setStocksAdd(stocksAdd);
        console.log(stocksAdd);
    }

    function formSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/newstock/addstock', stocksAdd).then(response => {
            alert('Success!');

        })

    }


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
                    <form onSubmit={formSubmit}>
                        <input type="text" name="txtStock" className="newstock" placeholder="Stock Name" autoComplete="off" required onChange={handleInputChange}></input>
                        <p></p>
                        <input type="number" step="0.01" className="newstock" name="nmbQuantity" placeholder="Quantity Bought" autoComplete="off" required onChange={handleInputChange}></input>
                        <p></p>
                        <input type="number" step="0.01" className="newstock" name="nmbPriceBuy" placeholder="Price Bought" autoComplete="off" required onChange={handleInputChange}></input>
                        <p></p>
                        <input type="number" step="0.01" className="newstock" name="nmbPriceSell" placeholder="Price Sold" autoComplete="off" onChange={handleInputChange}></input>
                        <p></p>
                        <input type="number" step="0.01" className="newstock" name="nmbQuantitySell" placeholder="Quantity Sold" autoComplete="off" onChange={handleInputChange}></input>
                        <p></p>
                        <SubmitButton></SubmitButton>
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