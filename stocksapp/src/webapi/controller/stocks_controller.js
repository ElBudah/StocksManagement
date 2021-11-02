const express = require('express');
const app = express();
const sql = require('mssql');
const cors = require('cors');

app.use(express.json());
app.use(cors());


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

exports.sellStocks = (req, res) => {

    const IDselected = req.body.idselected;
    const nmbPriceSell = req.body.nmbPriceSell;
    const nmbQuantitySell = req.body.nmbQuantitySell;

    console.log(nmbPriceSell);
    console.log(nmbQuantitySell);

    let sqlRequest = new sql.Request();
    let sqlQuery = "Update Stocks2 Set PriceSold = '" + nmbPriceSell + "', QuantitySold = '" + nmbQuantitySell + "' where ID = '" + IDselected + "';";

    sqlRequest.query(sqlQuery, (err, data) => {
        console.log(data);
    })
}

exports.profits = (req, res) => {
    let id = req.body.idselected;
    console.log(id);
    let sqlRequest = new sql.Request();
    let sqlQuery = 'Select * from Stocks2 where ID = ' + id + '';

    sqlRequest.query(sqlQuery, (err, data) => {
        console.log("deu certo");
        console.log(data);

        let PriceSold = data.map((item) => {
            return item.PriceSold;
        })
        console.log(PriceSold);

        let PriceBought = data.map((item) => {
            return item.PriceBought;
        })
        console.log(PriceBought);
        let Profit1 = PriceSold - PriceBought;

        console.log(Profit1);

        let QuantitySold = data.map((item) => {
            return item.QuantitySold;
        })

        console.log(QuantitySold);

        let ProfitFinal = Profit1*QuantitySold;

        console.log(ProfitFinal);

        let stage1 = (PriceSold/PriceBought);

        console.log(stage1);

        let stage2 = stage1-1;

        console.log(stage2);

        let ProfitPercUpdate = (stage2*100).toFixed(2);

        console.log(ProfitPercUpdate + "%");

        return res.json({profitUpdate : ProfitFinal, IDUpdate : id, profitPercUpdate: ProfitPercUpdate})
    })

}

exports.profitneat = (req,res) => {
    let profitneat = req.body.value;
    let ID = req.body.IDupdate;
    let profitPerc = req.body.profitPupdate;
    console.log("O valor puro do lucro: "+ profitneat);
    console.log('O ID que será atualizado é: '+ ID);
    console.log("A porcentagem ficou em: "+ profitPerc);

    let sqlRequest = new sql.Request();
    let sqlQuery = "Update Stocks2 set ProfitNeat = '"+profitneat+"', ProfitPerc = '"+profitPerc+"' where ID = "+ ID +"";
    sqlRequest.query(sqlQuery, (err,data)=>{
        console.log('Done');
    })
}

exports.profitperc = (req,res) => {

}