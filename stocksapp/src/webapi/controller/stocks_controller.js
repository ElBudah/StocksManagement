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
        const ProfitNeat = null;
        const ProfitPercentage = null;
        console.log('Estou aqui');
        
        let sqlRequest = new sql.Request();
        let sqlQuery = "Insert into Stocks2 values ('" + NewStock + "','" + Quantity + "','" + PriceBuy + "','" + PriceSell + "','" + QuantitySell + "',0,0)";
        sqlRequest.query(sqlQuery, (err, data) => {

            console.log("Inseriou");

        })

    })

}

exports.sellStocks =  (req,res) =>{

    const IDselected = req.body.idselected;
    const nmbPriceSell = req.body.nmbPriceSell;
    const nmbQuantitySell = req.body.nmbQuantitySell;

    console.log(nmbPriceSell);
    console.log(nmbQuantitySell);

    let sqlRequest = new sql.Request();
    let sqlQuery = "Update Stocks2 Set PriceSold = '"+nmbPriceSell+"', QuantitySold = '"+nmbQuantitySell+"' where ID = '"+IDselected+"';";
    
    sqlRequest.query(sqlQuery, (err,data)=>{
        console.log(data);
    })

}