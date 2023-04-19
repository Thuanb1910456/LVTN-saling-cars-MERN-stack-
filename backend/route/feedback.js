const express = require('express');
const Feedback = require('../controller/feedback');
const Router = express.Router();
Router.route('/')
    .post(Feedback.create)
    .get(Feedback.getAll)
Router.route('/:id')
    .put(Feedback.update)
module.exports = Router;
