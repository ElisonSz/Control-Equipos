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
route.get('/categorias/equipos',equipos.getCtEquipo);
route.get('/categorias/equipos/:id',equipos.getCtEquipo);
route.post('/categorias/equipos',equipos.createCtEquipo);
route.put('/categorias/equipos',equipos.updateCtEquipo);
route.delete('/categorias/equipos',equipos.updateCtEquipo);
module.exports = route;
