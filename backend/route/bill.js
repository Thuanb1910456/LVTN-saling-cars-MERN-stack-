const express = require('express');
const Bill = require('../controller/bill.js');
const Router = express.Router();
Router.route('/')
    .post (Bill.create)
    .get(Bill.getAll)
Router.route('/:id')
    .get(Bill.getOne)
    .delete(Bill.delete)
    .put(Bill.update)
Router.route('/status/1')
    .get(Bill.getStatus)
Router.route('/status/:id')
    .put(Bill.updateStatus)
Router.route('/user/:id')
    .get(Bill.getBillOfUser)
    .delete(Bill.deleteOneBill)
module.exports = Router;