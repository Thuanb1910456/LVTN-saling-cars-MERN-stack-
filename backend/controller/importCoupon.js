const ImportCoupon = require('../models/importCoupon');
const Products = require('../models/products');

exports.create = async (req, res, next) => {
    try {
        var phieunhap = await ImportCoupon.create({
            total: req.body.total,
            nhanvien: req.body.nhanVien,
            products: req.body.products
        })
        phieunhap.products.forEach(async (e) => {
            const product = await Products.findById({_id:e._id})
            product.soluong = product.soluong + e.soluong
            product.giatien = e.giatien
            await product.save();
        })
        
        res.status(200).json({
            status: "success",
            data: { phieunhap }
        })
    } catch {
        next(error);
    }

}
exports.getAll = async (req, res, next) => {
    try {
        var phieunhap = await ImportCoupon.find({})
            .populate('nhanvien')
        res.status(200).json({
            status: "success",
            data: { phieunhap }
        })
    } catch {
        next(error);
    }

}
exports.getOne = async (req, res, next) => {
    try {
        var phieunhap = await ImportCoupon.findById(req.params.id)
            .populate('nhanvien')
        res.status(200).json({
            status: "success",
            data: { phieunhap }
        })
    } catch {
        next(error);
    }

}