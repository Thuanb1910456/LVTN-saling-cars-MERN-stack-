const express = require('express');
const User = require('../controller/user');
const router = express.Router();
router.route('/')
    .post(User.create)
    .get(User.getAll)
router.route('/login')
    .post(User.login)
router.route('/:id')
    .delete(User.delete)
    .put(User.update)
    .get(User.getOne)
router.route('/reset-password')
    .post(User.resetPassword)
router.route('/reset-updatePassword/:email')
.post(User.updatePassword)
router.route('/reset-updatePassword/:token')
    .get(User.getToken)
module.exports = router;