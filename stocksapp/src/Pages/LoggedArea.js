import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/divs.css';
import axios from "axios";
import Text from "../Components/Text";
import SubmitButton from "../Components/SubmitButton";
import { response } from "express";

function LoggedArea() {
    const [stocks, setStocks] = useState([]);
    
    function clear() {
        window.localStorage.clear();
    }

    const clock = 1000000;
    useEffect(() =>{
        const id = setInterval(() =>{
            axios.get('http://localhost:5000/logged/stocks').then(response =>{
                setStocks(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })
        }, clock);
        return () =>  clearInterval(id);
    },[stocks]);


    function erasedata(){
        axios.delete('http://localhost:5000/erase/stocks').then(response =>{
            alert('The stocks data has been erased');
        })

    }


    // Insert new data (stocks) into database

    const [stocksAdd, setStocksAdd] = useState({
        txtAtivo : '',
        nmbQuantity : 0,
        nmbPriceBuy : 0,
        nmbPriceSell : 0,
        nmbQuantitySell : 0,
    })
    function handleInputChange(event){
        stocksAdd[event.target.name] = event.target.value;
        setStocksAdd(stocksAdd);
        console.log(stocksAdd);
    }

    function formSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:5000/newstock/addstock', stocksAdd).then(response =>{
            
        })
    }

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
            <form onSubmit={formSubmit}>
                <input type="text" name="txtStock" placeholder="Stock Name" autoComplete="off" required onChange={handleInputChange}></input>
                <input type="number" step="0.01" name="nmbQuantity" placeholder="Quantity Bought" autoComplete="off" required onChange={handleInputChange}></input>
                <input type="number" step="0.01" name="nmbPriceBuy" placeholder="Price Bought" autoComplete="off"  required onChange={handleInputChange}></input>
                <input type="number" step="0.01" name="nmbPriceSell" placeholder="Price Sold" autoComplete="off" required onChange={handleInputChange}></input>
                <input type="number" step="0.01" name="nmbQuantitySell" placeholder="Quantity Sold" autoComplete="off" required onChange={handleInputChange}></input>
                <p></p>
                <SubmitButton></SubmitButton>
            </form>
                <p></p>
                <button onClick={erasedata}>Erase all data</button>
                <p></p>
                <Link to="/"><button onClick={clear}>Loggout</button></Link>
            </div>
    )
}

export default LoggedArea;