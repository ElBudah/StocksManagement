const express = require('express');
const app = express();
const yup = require('yup');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

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


    validate();
    async function validate() {
        if (!(await yupuser.isValid(req.body))) {
            a = 1;
            res.json({ message: a });
        } else {
            a = 2;
            sql.connect(config, function (err) {

                if (err) console.log(err);
                let sqlRequest = new sql.Request();
                let sqlQuery = "Select * from Users";
                sqlRequest.query(sqlQuery, function (err, data) {

                    var Nomes = data.map((item) => {
                        return item.Nome
                    });

                    var Emails = data.map((item) => {
                        return item.Email
                    })

                    var Senha = data.map((item) => {
                        return item.Pass
                    })

                    var IDs = data.map((item) => {
                        return item.UserID
                    })

                    var auth = false;
                    for (var i = 0; i < Nomes.length; i++) {
                        if (Nomes[i] === req.body.txtName && Senha[i] === parseInt(req.body.txtPass) && Emails[i] === req.body.txtEmail) {
                            auth = true;
                            break;
                        } else {
                            auth = false;
                        }

                    }
                    var token = '';
                    if(auth === true){
                        token = jwt.sign({id:1},'secretcode');
                    }else{
                        token = 'error';
                    }
                    console.log(token);
                   
                    return res.send(token);
                });
            });

        }
    }

}