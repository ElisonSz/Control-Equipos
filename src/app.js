/*DEPENDENCIAS*/
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const myconnetion = require('express-myconnection');
const dotenv = require('dotenv');
const path = require('path')

const app = express();
dotenv.config();
/* Rutes*/
const usersRoutes = require('./routes/Users/routes')
const loginRoutes = require('./routes/login/login')
/* midlerwares*/
app.use(bodyParser.json())
app.use(morgan('dev'))
/*rutes */
app.use('/api',usersRoutes);
app.use('/api',loginRoutes);

/*Conexion DB*/
app.use(myconnetion(mysql,{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE}, 'single'));

/*carpetas publicas */
app.use(express.static(path.join(__dirname,'public')))

app.listen(process.env.PORT||4000, (req,res)=>{
    console.log('server on port:',process.env.PORT);
    console.log('http://localhost:',process.env.PORT);
});