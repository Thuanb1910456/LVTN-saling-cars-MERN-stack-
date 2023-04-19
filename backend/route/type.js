const express = require('express');
const Types = require('../controller/type');
const Router = express.Router();
Router.route('/')
    .post(Types.create)
    .get(Types.getAll)
Router.route('/:id')
    .delete(Types.delete)
    .put(Types.update)
Router.route('/status/:id')
    .put(Types.updateStatus)
module.exports = Router;