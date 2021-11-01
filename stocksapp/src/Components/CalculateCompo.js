import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import SubmitButton from "./SubmitButton";

function CalculateCompo() {
    //table
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/logged/stocks').then(res => {
            setStocks(res.data);
        })
    }, []);

    //Submit
    const [IDs, SetIDs] = useState({
        idselected : "0",
    })

    function handleInputChange(event){
        IDs[event.target.name] = event.target.value;
        SetIDs(IDs);
        console.log(IDs);
    }

    function submitForm(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/calculate/profits', stocks).then(response => {

        })

    }

    return (
        <Fragment>
            <div className="table">
                <table className="stocks">
                    {/*  <th>ID{stocks.map(stock => <tr><td>{stock.ID}</td></tr>)}</th>
                    <th>StockName{stocks.map(stock => <tr><td>{stock.Ativo}</td></tr>)}</th>
                    <p></p>
                    <th>QuantityBought{stocks.map(stock => <tr><td>{stock.Quantity}</td></tr>)}</th>
                    <p></p>
                    <th>PriceBought{stocks.map(stock => <tr><td>{stock.PriceBought}</td></tr>)}</th>
                    <p></p>
                    <th>PriceSold{stocks.map(stock => <tr><td>{stock.PriceSold}</td></tr>)}</th>
                    <p></p>
                    <th>QuantitySold{stocks.map(stock => <tr><td>{stock.QuantitySold}</td></tr>)}</th>
                    <p></p>
                    <th>Profit($){stocks.map(stock => <tr><td>{stock.ProfitNeat}</td></tr>)}</th>
                    <p></p>
                    <th>Profit(%){stocks.map(stock => <tr><td>{stock.ProfitPerc}</td></tr>)}</th> */}
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
                    <td>{stocks.map(stock => <tr>{stock.ID}</tr>)}</td>
                    <td>{stocks.map(stock => <tr>{stock.Ativo}</tr>)}</td>
                    <td>{stocks.map(stock => <tr>{stock.Quantity}</tr>)}</td>
                    <td>{stocks.map(stock => <tr>{stock.PriceBought}</tr>)}</td>
                    <td>{stocks.map(stock => <tr>{stock.PriceSold}</tr>)}</td>
                    <td>{stocks.map(stock => <tr>{stock.QuantitySold}</tr>)}</td>
                    <td>{stocks.map(stock => <tr>{stock.ProfitNeat}</tr>)}</td>
                    <td>{stocks.map(stock => <tr>{stock.ProfitPerc}</tr>)}</td>

                </table>
            </div>
            <div className="menu">
                <form onSubmit={submitForm}>
                    <p></p>
                    <select name="idselected" onChange={handleInputChange}>
                        <option value="0">Select an ID to calculate</option>
                        {stocks.map(stocksIDs => <option key={stocksIDs.ID}>{stocksIDs.ID}</option>)}
                    </select>
                    <p></p>
                    <SubmitButton></SubmitButton>
                </form>
            </div>
        </Fragment>
    )
}

export default CalculateCompo;