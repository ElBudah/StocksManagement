const express = require('express');
const app = express();
const yup = require('yup');
const sql = require('mssql');

app.use(express.json());

const config = {
    user: 'sa',
    password: 'ricardo93',
    server: 'localhost',
    database: 'Stocks',
    port: 49699
};

exports.post = (req, res, next) => {
    var a = 0;
    const yupuser = yup.object().shape({
        txtName: yup.string().required(),
        txtEmail: yup.string().email().required(),
        txtPass: yup.number().required().positive().integer()
    });

    console.log(req.body.txtPass);
    validate();
    async function validate() {
        if (!(await yupuser.isValid(req.body))) {
            a = 1;
            console.log(a);
            res.json({ message: a });
        } else {
            a = 2;
            console.log(a);
            sql.connect(config, function (err) {
                console.log(req.body.txtName);
                if (err) console.log(err);
                let sqlRequest = new sql.Request();
                let sqlQuery = "Insert into Users values ('" + req.body.txtName + "','" + req.body.txtEmail + "', " + req.body.txtPass + ")";
                sqlRequest.query(sqlQuery, function (err, data) {
                    console.log(data);
                    sql.close();
                });
            });
            res.json({ message: a })
        }
    }

}

exports.get = (req, res, next) => {
    sql.connect(config, (err) => {
        if(err)console.log(err);
        let sqlRequest = new sql.Request();
        let sqlQuery = 'Select * from Stocks';
        sqlRequest.query(sqlQuery, (err,data)=>{

            /* var Ativo = data.map((item)=>{
                return item.Ativo;
            })

            var Quantity = data.map((item)=>{
                return item.Quantity;
            })

            var PriceBuy = data.map((item)=>{
                return item.PriceBuy;
            })

            var PriceSell = data.map((item)=>{
                return item.PriceSell;
            })

            var QuantitySell = data.map((item)=>{
                return item.QuantitySell;
            })
            
            var ProfitNeat = data.map((item)=>{
                return item.ProfitNeat;
            })

            var ProfitPercentage = data.map((item)=>{
                return item.ProfitPercentage;
            }) */
            
            
            console.log(data);
            res.send(data);
        })

    })
}