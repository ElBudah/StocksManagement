import React, { useState , useEffect} from "react";
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

    const clock = 1000;
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
    const [soldstock, Setsoldstock] = useState({
        nmbPriceSell: 0,
        nmbQuantitySell: 0,
    })

    function handleInputChange(event) {
        soldstock[event.target.name] = event.target.value;
        Setsoldstock(soldstock);
    }
    return (
        <Fragment>
            <Logo></Logo>
            <div className="table">
                <table className="stocks">
                    <th>ID{stocks.map(stock => <tr><td>{stock.ID}</td></tr>)}</th>
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
                    <th>Profit(%){stocks.map(stock => <tr><td>{stock.ProfitPerc}</td></tr>)}</th>
                </table>
            </div>
            <div className="menu">
                <h3>Select the ID of the stock you want to sell and fill the blanks below </h3>
                <select className="newstock">
                    <option value="0">IDs available</option>
                    {stocks.map(stock => <option key={stock.ID}>{stock.ID}</option>)}
                </select>
                <p></p>
                <input type="number" step="0.01" className="newstock" name="nmbPriceSell" placeholder="Price Sold" autoComplete="off" onChange={handleInputChange}></input>
                <p></p>
                <input type="number" step="0.01" className="newstock" name="nmbQuantitySell" placeholder="Quantity Sold" autoComplete="off" onChange={handleInputChange}></input>
                <p></p>
                <SubmitButton></SubmitButton>
                <p></p>
                <Link to='/AddStock'><button>Return</button></Link>
                <p></p>
                <Link to="/"><button>Logout</button></Link>
            </div>
            
        </Fragment>
    )
}

export default SoldStock;