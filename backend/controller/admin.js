const Admin = require('../models/admin');
exports.create = async (req, res, next) => {
    try {
        req.body.status = true
        const admin = await Admin.create({
            ...req.body,
            chucvu: '6409a81c84766904c46cec8d'
        });
        res.status(200).json({
            status: "create Admin success",
            data: { admin }
        });
    } catch (error) {
        next(error);
    }
}
// update 
exports.update = async (req, res, next) => {
    // console.log(req.body);
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.status(200).json({
            status: "success",
            data: { admin }
        })
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id,{
            status: false
        });
        res.status(200).json({
            status: "deleted",
        })
    } catch (error) {
        next(error);
    }
}
//get all
exports.getAll = async (req, res, next) => {
    try {
        const results = await Admin.find({})
            .populate('chucvu')
        const admin = results.filter((e) => e.status != false)
        res.status(200).json({
            status: "success",
            results: admin.length,
            data: { admin }
        })
    } catch (error) {
        res.json(error);
    }
}
//get one
exports.getOneAccounts = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id)
            .populate('chucvu')
        console.log(admin);
        res.status(200).json({
            status: "success",
            data: { admin }
        })
    } catch (error) {
        res.json(error);
    }
}
//get nhanvien
exports.getAccount = async (req, res, next) => {
    try {
        const nhanvien = await Admin.find({
            chucvu: '6409a81c84766904c46cec8d'
        })
        res.status(200).json({
            status: "success",
            data: { nhanvien }
        })
    } catch (error) {
        res.json(error);
    }
}
exports.login = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        else if (admin.password != req.body.password) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        else {
            res.status(200).send(admin)
        }
    } catch (error) {
        res.json(error);
    }
}
