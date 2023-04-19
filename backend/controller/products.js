const Products = require("../models/products.js");
const fs = require('fs');

//create
exports.create = async (req, res, next) => {
    try {
        let folderPath = "C:\\Users\\Thuan\\Desktop\\CodeLV\\frontend\\public\\image\\SanPham";
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
        req.body.delete = false;
        req.body.image = req.files?.file?.name
        const cars = await Products.create({ ...req.body });
        res.status(200).json({
            status: "create products success",
            data: { cars }
        })
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
            update = { ...req.body, image: req.files.file.name }
            let folderPath = "C:\\Users\\Thuan\\Desktop\\CodeLV\\frontend\\public\\image\\SanPham";
            req.files.file.mv(`${folderPath}/${req.files.file.name}`, function (err) {
                if (err) {
                    console.log(err)
                    return res.status(500).send({ msg: "Error occured" });
                }
            });
        }
        const cars = await Products.findByIdAndUpdate(req.params.id, { ...update }, { new: true });
        res.status(200).json({
            status: "success",
            data: { cars }
        })
    } catch (error) {
        next(error);
    }
}
//update status
exports.updateStatus = async (req, res, next) => {
    try {
        const cars = await Products.findById(req.params.id)
        cars.status = !cars.status
        await cars.save();
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const cars = await Products.findByIdAndDelete(req.params.id);
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
        const temp = await Products.find()
            .populate('type')
            .populate('nhanvien')
        cars = temp.filter((e)=> e.deleted != true)
        res.status(200).json({
            status: "success",
            results: cars.length,
            data: { cars }
        })
    } catch (error) {
        res.json(error);
    }
}
//get one
exports.getOne = async (req, res, next) => {
    try {
        const cars = await Products.findById(req.params.id)
            .populate('type')
        res.status(200).json({
            status: "success",
            data: { cars }
        })
    } catch (error) {
        res.json(error);
    }
}