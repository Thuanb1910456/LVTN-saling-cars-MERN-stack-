const express = require('express');
const Oder = require('../controller/oder.js');
const Router = express.Router();
Router.route('/')
    .get(Oder.getAll)
Router.route('/:id')
    .get(Oder.getOne)
    .delete(Oder.delete)
    .put(Oder.update)
Router.route('/status/:id')
    .put(Oder.updateStatus)
Router.route('/user/:id')
    .get(Oder.getOderOfUser)
    .delete(Oder.deleteOneOder)
    .post(Oder.updateProducts)
module.exports = Router;