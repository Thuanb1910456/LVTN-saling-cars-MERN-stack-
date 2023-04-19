const express = require('express');
const ImportCoupon = require('../controller/importCoupon');
const Router = express.Router();
Router.route('/')
    .post(ImportCoupon.create)
    .get(ImportCoupon.getAll)

Router.route('/:id')
    .get(ImportCoupon.getOne)
module.exports = Router;