
import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';
import '../styles/divs.css';
import axios from "axios";
import { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";

function LoggedArea() {
     const [stocks, setStocks] = useState([]);
    

    function clear() {
        window.localStorage.clear();
    }

    useEffect(() => {
        axios.get('http://localhost:5000/logged/stocks').then(response => {
            setStocks(response.data);
            console.log(response.data);
        })
    }, []);

    return (
            <div>
                <div className="table">
                <table>
                   <th>Ativo{stocks.map(stock =><tr>{stock.Ativo}</tr>)}</th>
                   <p></p>
                    <th>Quantity{stocks.map(stock =><tr>{stock.Quantity}</tr>)}</th>
                    <p></p>
                    <th>PriceBuy{stocks.map(stock =><tr>{stock.PriceBuy}</tr>)}</th>
                    <p></p>
                    <th>PriceSell{stocks.map(stock =><tr>{stock.PriceSell}</tr>)}</th>
                    <p></p>
                    <th>QuantitySell{stocks.map(stock =><tr>{stock.QuantitySell}</tr>)}</th>
                    <p></p>
                    <th>ProfitNeat{stocks.map(stock =><tr>{stock.ProfitNeat}</tr>)}</th>
                    <p></p>
                    <th>ProfitPercentage{stocks.map(stock =><tr>{stock.ProfitPercentage}</tr>)}</th>
                </table>
            </div>
                <Link to="/"><button onClick={clear}>Loggout</button></Link>
            </div>
    )
}

export default LoggedArea;