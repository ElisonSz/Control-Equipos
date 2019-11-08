const express = require('express');
const route = express.Router();
const prestamos = require("../../controllers/Prestamos/Prestamos")

route.get('/prestamos',prestamos.getPrestamo);
route.get('/prestamos/:data',prestamos.getDataPrestamos);
route.post('/prestamos',prestamos.createPrestamo);
route.post('/prestamos/date',prestamos.getPrestamoForDate);
route.put('/prestamos',prestamos.updatePrestamo);
module.exports = route;