const Position = require('../models/position');
exports.create = async (req, res, next) => {
    try {
        const position = await Position.create(req.body);
        res.status(200).json({
            status: "create Position success",
            data: {position}
        });
    } catch (error) {
        next(error);
    }
}
// update 
exports.update = async (req, res, next) => {
    // console.log(req.body);
    try {
        const position = await Position.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.status(200).json({
            status: "success",
            data: {position}
        })
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const position = await Position.findByIdAndDelete(req.params.id);
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
        const position = await Position.find({})
        res.status(200).json({
            status: "success",
            results: Position.length,
            data: {position}
        })
    } catch (error) {
        res.json(error);
    }
}
//ge one
exports.getOneAccounts = async (req, res, next) => {
    try {
        const position = await Position.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {position}
        })
    } catch (error) {
        res.json(error);
    }
}
exports.login = async (req, res, next) => {
    // console.log(req.body);
    try {
        const position = await Position.findOne({ email: req.body.email });
        if (!Position) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        else if (Position.password != req.body.password) {
            const err = new Error('Email or Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
        else {
            res.status(200).send(Position)
        }
    } catch (error) {
        res.json(error);
    }
}
