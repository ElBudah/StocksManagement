const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.post('/login', (req,res,next)=>{
    const name = req.body.txtName;
    const pass = req.body.txtPassword;

    console.log(name);
    console.log(pass);
})


app.listen(5000, ()=>{
    console.log('The webserver is running');
})