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

sql.connect(config, (err) => {

})

exports.post = (req, res) => {
    let a = 0;

    let sqlRequest = new sql.Request();
    let sqlQuery = 'Select * from Users';
    sqlRequest.query(sqlQuery, (err, data) => {
        console.log("Data: " + data);
        let UsersEmails = data.map((item) => {
            return item.Email;
        })
        console.log("User emails: " + UsersEmails);

        let UsertxtEmail = req.body.txtEmail;
        console.log("User txt: " + UsertxtEmail);

        for (var i = 0; i < UsersEmails.length; i++) {
            if (UsertxtEmail == UsersEmails[i]) {
                console.log('achou');
                a = 1;
                break;
            } else {
                console.log('não achou');
                let sqlRequest2 = new sql.Request();
                let sqlQuery = "Insert into Users values ('" + req.body.txtName + "','" + req.body.txtEmail + "','" + req.body.txtPass + "')";
                sqlRequest2.query(sqlQuery, (err, data) => {

                })
                a = 2;
            }
        }

        if (UsersEmails.length == 0) {
            console.log('Length equals 0');
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

/* console.log(req.body.txtPass);
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
        res.json({ message: a }) */





exports.get = (req, res, next) => {
    sql.connect(config, (err) => {
        if (err) console.log(err);
        let sqlRequest = new sql.Request();
        let sqlQuery = 'Select * from Stocks2';
        sqlRequest.query(sqlQuery, (err, data) => {
            res.send(data);
        })

    })
}

exports.delete = (req, res, next) => {
    sql.connect(config, (err) => {
        if (err) console.log(err);
        let sqlRequest = new sql.Request();
        let sqlQuery = 'Delete from Stocks2';
        sqlRequest.query(sqlQuery, (err, data) => {
            console.log(data);
            res.send(data);
        })
    })
}