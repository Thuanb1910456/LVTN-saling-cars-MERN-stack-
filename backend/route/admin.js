const express = require('express');
const Admin = require('../controller/admin');
const router = express.Router();
router.route('/')
    .post(Admin.create)
    .get(Admin.getAll)
router.route('/login')
    .post(Admin.login)
router.route('/nhanvien')
    .get(Admin.getAccount)
router.route('/:id')
    .delete(Admin.delete)
    .put(Admin.update)
    .get(Admin.getOneAccounts)
module.exports = router;