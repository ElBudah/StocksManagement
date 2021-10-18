const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const yup = require('yup');
const routes = require('./routes/routes');
const loginRoutes = require('./routes/login_routes');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res, next) => {
    const name = req.body.txtName;
    const pass = req.body.txtPassword;

    console.log(name);
    console.log(pass);
})



app.use('/signup', routes);

app.use('/signin', loginRoutes);

/* app.post('/signup', (req, res, next) => {

    var a = 0;
    const yupuser = yup.object().shape({
        txtName: yup.string().required(),
        txtEmail: yup.string().email().required(),
        txtPass: yup.number().required().positive()
    });
    
    console.log(req.body.txtPass);
    validate();
    async function validate(){
        if(!(await yupuser.isValid(req.body))){
            a = 1;
            console.log(a);
            res.json({message: a});
        }else{
            a = 2;
            console.log(a);
            res.json({message: a})
        }
    }

}); */


app.listen(5000, () => {
    console.log('The webserver is running');
})