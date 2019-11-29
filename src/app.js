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
const loginRoutes = require('./routes/login/login')
const usersRoutes = require('./routes/Users/routes')
const equiposRoutes = require('./routes/Equipos/routes')
const prestamosRoutes = require('./routes/Prestamos/Prestamos')
/* midlerwares*/
app.use(bodyParser.json())
app.use(morgan('dev'))
/*rutes */
app.use('/api',loginRoutes);
app.use('/api',usersRoutes);
app.use('/api',equiposRoutes);
app.use('/api',prestamosRoutes);

/*Conexion DB*/
app.use(myconnetion(mysql,{
    host: '167.172.195.6',
    user: 'test',
    password: 'Elisongs.98',
    port: 3306,
    database: 'Control_Equipos'}, 'single'));

/*carpetas publicas */
app.use(express.static(path.join(__dirname,'public')))

app.listen(process.env.PORT||4000, (req,res)=>{
    console.log('server on port:',process.env.PORT);
    console.log('http://localhost:',process.env.PORT);
});
