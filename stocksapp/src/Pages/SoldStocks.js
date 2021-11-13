import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import Logo from "../Components/Logo";
import SubmitButton from "../Components/SubmitButton";

function SoldStock() {
    const [stocks, setStocks] = useState([]);

    function clear() {
        window.localStorage.clear();
    }

    const clock = 300;
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

    // Logic to sell stocks ########### //

    const [soldstock, Setsoldstock] = useState({
        idselected: 0,
        nmbPriceSell: 0,
        nmbQuantitySell: 0,
    })

    function handleInputChange(event) {
        soldstock[event.target.name] = event.target.value;
        Setsoldstock(soldstock);
        console.log(soldstock);
    }

    function sellSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/sell/sellstocks', soldstock).then(response => {

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
                <form onSubmit={sellSubmit}>
                    <h3>Select stock's ID you want to sell and fill the blanks below </h3>
                    <select className="newstock" name="idselected" onChange={handleInputChange}>
                        <option value="0" >IDs available</option>
                        {stocks.map(stock => <option key={stock.ID}>{stock.ID}</option>)}
                    </select>
                    <p></p>
                    <input type="number" step="0.01" className="newstock" name="nmbPriceSell" placeholder="Price Sold" autoComplete="off" onChange={handleInputChange}></input>
                    <p></p>
                    <input type="number" step="0.01" className="newstock" name="nmbQuantitySell" placeholder="Quantity Sold" autoComplete="off" onChange={handleInputChange}></input>
                    <p></p>
                    <SubmitButton title="Submit"></SubmitButton>
                    <p></p>
                    <Link to="/calculate"><button>Calculate Profits</button></Link>
                    <p></p>
                    <Link to='/AddStock'><button>Add Stocks</button></Link>
                    <p></p>
                    <Link to="/"><button>Logout</button></Link>
                </form>
            </div>
        </Fragment>
    )
}

export default SoldStock;