const express = require('express');
const route = express.Router();
const prestamos = require("../../controllers/Prestamos/Prestamos")

route.get('/prestamos/all',prestamos.getPrestamo);
route.get('/prestamos/all/:data',prestamos.getDataPrestamos);
route.get('/prestamos/:id',prestamos.getIdPrestamo);
route.get('/pendientes/prestamos',prestamos.getDataPrestamosPendientes);
route.get('/solventes/prestamos',prestamos.getDataPrestamosSolventes);
route.post('/prestamos',prestamos.createPrestamo);
route.post('/prestamos/date',prestamos.getPrestamoForDate);
route.put('/prestamos',prestamos.updatePrestamo);
module.exports = route;
