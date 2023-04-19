const express = require('express');
const Products = require('../controller/products.js');
const Router = express.Router();
Router.route('/')
    .post(Products.create)
    .get(Products.getAll)
Router.route('/:id')
    .get(Products.getOne)
    .delete(Products.delete)
    .put(Products.update)
Router.route('/status/:id')
    .put(Products.updateStatus)
module.exports = Router;