
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
        })
    }, []);

    return (
            <div>
                <div className="table">
                <table>
                    <tr>
                        <th>Nome do ativo</th>
                        <th>Quantidade comprada</th>
                        <th>Preço de compra</th>
                        <th>Preço de venda</th>
                        <th>Quantidade vendida</th>
                        <th>Lucro(R$)</th>
                        <th>Lucro(%)</th>
                    </tr>
                    <tr>
                        {stocks.map(stock => (<td>{stock}</td>))}
                        
                    </tr>
                </table>
            </div>
                <Link to="/"><button onClick={clear}>Loggout</button></Link>
            </div>
    )
}

export default LoggedArea;