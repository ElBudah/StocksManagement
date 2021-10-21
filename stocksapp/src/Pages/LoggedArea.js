
import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';
import '../styles/divs.css';
import axios from "axios";

function LoggedArea() {
    const [stocks, setStocks] = useState({
        Name: '',
        Quantity: 0,
    })

    function clear() {
        window.localStorage.clear();
    }

    useEffect(() => {
        axios.get('http://localhost:5000/logged/stocks').then(response => {

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
                        {}
                    </tr>

                    <tr>Teste</tr>


                    <td>Teste td</td>

                </table>
            </div>

            <Link to="/"><button onClick={clear}>Loggout</button></Link>
        </div>
    )
}


export default LoggedArea;