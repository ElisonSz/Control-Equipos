const express = require('express');
const route = express.Router();
const login = require("../../controllers/login/login");

route.post('/login',login.validar);

module.exports = route;