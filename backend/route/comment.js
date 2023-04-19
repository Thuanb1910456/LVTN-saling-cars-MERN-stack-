const express = require('express');
const Comment = require('../controller/comment');
const Router = express.Router();
Router.route('/')
    .post(Comment.create)
    .get(Comment.getAll)
Router.route('/:id')
    .delete(Comment.delete)
    .put(Comment.update)
Router.route('/status/:id')
    .put(Comment.updateStatus)
Router.route('/products/:id')
    .get(Comment.getOneComment)
module.exports = Router;