const express = require('express');
const app = express();
const sql = require('mssql');
const yup = require('yup');
const jwt = require('jsonwebtoken');

app.use(express.json());

const config = {
    user: 'sa',
    password: 'ricardo93',
    server: 'localhost',
    database: 'Stocks',
    port: 49699
};

sql.connect(config, (err) => {

})

exports.post = (req, res) => {
    let a = 0;

    let sqlRequest = new sql.Request();
    let sqlQuery = 'Select * from Users';
    sqlRequest.query(sqlQuery, (err, data) => {
        
        let UsersEmails = data.map((item) => {
            return item.Email;
        })
        

        let UsertxtEmail = req.body.txtEmail;
        

        for (var i = 0; i < UsersEmails.length; i++) {
            if (UsertxtEmail == UsersEmails[i]) {
               
                a = 1;
                break;
            } else {
                
                let sqlRequest2 = new sql.Request();
                let sqlQuery = "Insert into Users values ('" + req.body.txtName + "','" + req.body.txtEmail + "','" + req.body.txtPass + "')";
                sqlRequest2.query(sqlQuery, (err, data) => {

                })
                a = 2;
                break;
            }
        }

        if (UsersEmails.length == 0) {
            
            let sqlRequest2 = new sql.Request();
            a = 2;
            let sqlQuery = "Insert into Users values ('" + req.body.txtName + "','" + req.body.txtEmail + "','" + req.body.txtPass + "')";
            sqlRequest2.query(sqlQuery, (err, data) => {

            })
        }
        console.log(a);
        return res.json({ message: a });
    }
    )
}

exports.login = (req, res, next) => {
    var a = 0;
    const yupuser = yup.object().shape({
        txtName: yup.string().required(),
        txtEmail: yup.string().email().required(),
        txtPass: yup.number().required().positive().integer()
    });
    console.log(req.body.txtName);
    console.log(req.body.txtEmail);
    console.log(req.body.txtPass);
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