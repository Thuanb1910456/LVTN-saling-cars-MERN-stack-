const express = require('express');
const Position = require('../controller/position');
const router = express.Router();
router.route('/')
    .post(Position.create)
    .get(Position.getAll)
router.route('/login')
    .post(Position.login)
router.route('/:id')
    .delete(Position.delete)
    .put(Position.update)
    .get(Position.getOneAccounts)
module.exports = router;