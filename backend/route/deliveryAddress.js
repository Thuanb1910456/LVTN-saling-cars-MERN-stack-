const express = require('express');
const DeliveryAddress = require('../controller/deliveryAddress');
const Router = express.Router();
Router.route('/')
    .post(DeliveryAddress.create)
Router.route('/:id')
    .get(DeliveryAddress.getOneAddress)
    .delete(DeliveryAddress.delete)
    .put(DeliveryAddress.update)
Router.route('/status/:id')
    .put(DeliveryAddress.updateStatus)
module.exports = Router;