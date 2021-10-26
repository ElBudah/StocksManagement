const express = require('express');
const app = express();
const sql = require('mssql');

app.use(express.json());

const config = {
    user: 'sa',
    password: 'ricardo93',
    server: 'localhost',
    database: 'Stocks',
    port: 49699
};

exports.post = (req, res) => {
    sql.connect(config, (err) => {
        if (err) console.log(err);
        const NewStock = req.body.txtStock;
        const Quantity = parseInt(req.body.nmbQuantity);
        const PriceBuy = parseFloat(req.body.nmbPriceBuy);
        const PriceSell = parseFloat(req.body.nmbPriceSell);
        const QuantitySell = parseFloat(req.body.nmbQuantitySell);
        console.log(PriceBuy);

        let sqlRequest = new sql.Request();
        let sqlQuery = "Insert into Stocks values ('" + NewStock + "','" + Quantity + "','" + PriceBuy + "','" + PriceSell + "','" + QuantitySell + "')";
        sqlRequest.query(sqlQuery, (err, data) => {

            console.log("Inseriou");

        })

    })

}