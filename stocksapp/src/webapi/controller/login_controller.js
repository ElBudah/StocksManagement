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

                if (err) console.log(err);
                let sqlRequest = new sql.Request();
                let sqlQuery = "Select * from Users";
                sqlRequest.query(sqlQuery, function (err, data) {
                    console.log(data);

                    var Nomes = data.map((item)=>{
                        return item.Nome
                    });
                    console.log(Nomes);

                    var Emails = data.map((item)=>{
                        return item.Email
                    })
                    console.log(Emails);

                    var Senha = data.map((item)=>{
                        return item.Pass
                    })
                    console.log(Senha);

                    var IDs = data.map((item)=>{
                        return item.UserID
                    })
                    console.log(IDs);

                });
            });
            res.json({ message: a })
        }
    }

}