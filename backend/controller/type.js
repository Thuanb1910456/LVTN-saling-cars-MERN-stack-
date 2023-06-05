const Types = require('../models/type');
const fs = require('fs');
exports.create = async (req, res, next) => {
    let folderPath = "C:\\Users\\Thuan\\Desktop\\CodeLV\\frontend\\public\\image\\ThuongHieu";
    try {

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

    } catch (err) {
        console.error(err);
    }
    req.files?.file.mv(`${folderPath}/${req.files.file.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
    });
    req.body.status = true;
    req.body.deleted = false;
    req.body.logo = req.files?.file?.name
    try {
        const cars = await Types.create(req.body);
        res.status(200).json({
            status: "create Types success",
            data: { cars }
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
            update = { ...req.body, logo: req.files.file.name }
            let folderPath = "C:\\Users\\Thuan\\Desktop\\CodeLV\\frontend\\public\\image\\ThuongHieu";
            req.files?.file.mv(`${folderPath}/${req.files.file.name}`, function (err) {
                if (err) {
                    console.log(err)
                    return res.status(500).send({ msg: "Error occured" });
                }
            });
        }
        const cars = await Types.findByIdAndUpdate(req.params.id, { ...update }, { new: true });
        res.status(200).json({
            status: "success",
            data: { cars }
        })
    } catch (error) {
        next(error);
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const cars = await Types.findById(req.params.id)
        // console.log(cars.status);
        cars.status = !cars.status
        await cars.save();
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const admin = await Types.findByIdAndUpdate(req.params.id, {
            deleted: true
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
        var cars = []
        const temp = await Types.find({})
        cars = temp.filter((e) =>  e.deleted == false)
        res.status(200).json({
            status: "success",
            results: cars.length,
            data: { cars }
        })
    } catch (error) {
        res.json(error);
    }
}