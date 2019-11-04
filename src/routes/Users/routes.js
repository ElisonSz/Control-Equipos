const express = require('express');
const route = express.Router();
const users = require('../../controllers/Users/Users');

route.get('/users',users.getUser);
route.get('/users/:id',users.getOneUser);
route.post('/users',users.createUser);
route.put('/users',users.updateUser);
route.delete('/users',users.updateUser);
module.exports = route;