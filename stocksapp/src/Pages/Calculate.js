import React, { Fragment, useEffect, useState } from "react";
import CalculateCompo from "../Components/CalculateCompo";
import Logo from "../Components/Logo";
import { Link } from 'react-router-dom';
import axios from 'axios';
import SubmitButton from "../Components/SubmitButton";


function Calculate() {
    const [stocks, setStocks] = useState([]);


    const clock = 1000;
    useEffect(() => {
        const id = setInterval(() => {
            axios.get('http://localhost:5000/logged/stocks').then(res => {
                setStocks(res.data);
            }).catch(err =>{
                console.log(err);
            })
        }, clock);
        return () => clearInterval(id);
    }, [stocks]);


    const [IDs, SetIDs] = useState({
        idselected: 0,
    })

    function handleInputChange(event) {
        IDs[event.target.name] = event.target.value;
        SetIDs(IDs);
        console.log(IDs);
    }

    function submitForm(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/calculate/profits', IDs).then(response => {
            alert(response.data.profitUpdate);
            /* window.localStorage.setItem('ProfitNeat',response.data.message); */
            let a = response.data.profitUpdate;
            let id = response.data.IDUpdate; 
            updatetable(a,id);
        })
    }

    //update function for Stocks Table inserting ProfitNeat
    function updatetable(a,id){
        console.log(a);
        console.log(id);
        const valueobj = ({
            value : a,
            IDupdate : id
        })
        axios.post('http://localhost:5000/updating/profitneat', valueobj).then(response =>{

        })

    }

    return (
        <Fragment>
            <Logo></Logo>
            <CalculateCompo></CalculateCompo>
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
                        {stocks.map(stocksIDs => <option key={stocksIDs.ID} value={stocks.ID}>{stocksIDs.ID}</option>)}
                    </select>
                    <p></p>
                    <SubmitButton></SubmitButton>
                </form>
            </div>

        </Fragment>
    )
}

export default Calculate;