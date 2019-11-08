const express = require('express');
const route = express.Router();
const prestamos = require("../../controllers/Prestamos/Prestamos")

route.post('/prestamos',prestamos.createPrestamo);

module.exports = route;