const User = require('../models/user');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const fs = require('fs');
exports.create = async (req, res, next) => {
    try {
        req.body.status = true
        const user = await User.create(req.body.account);
        res.status(200).json({
            status: "create User success",
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}
// update 
exports.update = async (req, res, next) => {
    try {
        var update = {};
        if (!req.files?.file) {
            update = req.body
        } else {
            update = { ...req.body, avt: req.files.file.name }
            let folderPath = "C:\\Users\\Thuan\\Desktop\\CodeLV\\frontend\\public\\image\\Avt"
            req.files?.file.mv(`${folderPath}/${req.files.file.name}`, function (err) {
                if (err) {
                    console.log(err)
                    return res.status(500).send({ msg: "Error occured" });
                }
            });
        }
        const user = await User.findByIdAndUpdate(req.params.id, { ...update }, { new: true });
        res.status(200).json({
            status: "success",
            data: { user }
        })
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const admin = await User.findByIdAndUpdate(req.params.id, {
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
        const results = await User.find({})
const user = results.filter((e)=>e.status != false)
        res.status(200).json({
            status: "success",
            results: user.length,
            data: { user }
        })
    } catch (error) {
        res.json(error);
    }
}
//get one
exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({
            status: "success",
            results: user.length,
            data: { user }
        })
    } catch (error) {
        res.json(error);
    }
}
//login
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        else if (user.password != req.body.password) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        else {
            res.status(200).send(user)
        }
    } catch (error) {
        res.json(error);
    }
}
//reset password
exports.resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email.email })
        if (!user) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        const serect = jwt + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, serect, { expiresIn: '5m' });
        const link = `http://localhost:3000/${token}/reset-password`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'thuannguyennguyen2006@gmail.com',
                pass: 'dfpoqgvngkeousgk'
            }
        });

        var mailOptions = {
            from: 'youremail@student.ctu.edu.vn',
            to: user.email,
            subject: 'TN-CARS Xin Chào',
            text: 'truy cập vào link để cập nhật lại mật khẩu của bạn.' + link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getToken = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            data: jwt.decode(req.params.token)
        })
    } catch (error) {
        console.log(error);
    }
}
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user || req.body.password.password != req.body.password.confimPassword) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        console.log(user);
        user = await User.updateOne({ email: user.email }, {
            password: req.body.password.password
        })
        res.status(200).json({
            status: "success",
            results: user.length,
            data: { user }
        })
    } catch (error) {
        res.json(error);
    }
}