const express = require('express');
const route = express.Router();
const equipos = require('../../controllers/Equipos/Equipos');

//!>>>>>>>>>>>>>>>>>>>>EQUIPOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!//
route.get('/equipos',equipos.getEquipos);
route.get('/equipos/:id',equipos.getOneEquipo);
route.post('/equipos',equipos.createEquipo);
route.put('/equipos',equipos.updateEquipo);
route.delete('/equipos',equipos.updateEquipo);
//!>>>>>>>>>>>>>>>>>>>CATEGORIA-EQUIPOS<<<<<<<<<<<<<<<<<<<<<<<<<<!//
route.get('/equipos/categorias',equipos.getCtEquipo);
route.get('/equipos/categorias/:id',equipos.getCtEquipo);
route.post('/equipos/categorias',equipos.createCtEquipo);
route.put('/equipos/categorias',equipos.updateCtEquipo);
route.delete('/equipos/categorias',equipos.updateCtEquipo);
module.exports = route;
