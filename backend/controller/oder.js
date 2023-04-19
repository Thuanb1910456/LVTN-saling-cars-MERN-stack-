const { Types } = require("mongoose");
const Oder = require("../models/oder.js");
const Cart = require("../models/products.js")
// update 
exports.update = async (req, res, next) => {
    try {
        const oder = await Oder.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.status(200).json({
            status: "success",
            data: { oder }
        })
    } catch (error) {
        next(error);
    }
}
//update status
exports.updateStatus = async (req, res, next) => {
    try {
        const oder = await Oder.findById(req.params.id)
        oder.status = !oder.status
        await oder.save();
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const oder = await Oder.findByIdAndDelete(req.params.id);
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
        const oder = await Oder.find()
            .populate('customer')
            .populate({
                path: 'products',
                populate: { path: 'id_product' }
            })
        res.status(200).json({
            status: "success",
            results: oder.length,
            data: { oder }
        })
    } catch (error) {
        res.json(error);
    }
}
//get one
exports.getOne = async (req, res, next) => {
    try {
        const oder = await Oder.findById(req.params.id)
            .populate('customer')
            .populate({
                path: 'products',
                populate: { path: 'id_product' }
            })
        res.status(200).json({
            status: "success",
            data: { oder }
        })
    } catch (error) {
        res.json(error);
    }
}
//get oder of user
exports.getOderOfUser = async (req, res, next) => {
    try {
        const oder = await Oder.findOne({
            customer: req.query.idCustomer
        })
            .populate('customer')
            .populate({
                path: 'products',
                populate: { path: 'id_product' }
            });
        res.status(200).json({
            status: "success",
            data: oder
        })
    } catch (error) {
        next(error);
    }
}
//delete one
exports.deleteOneOder = async (req, res, next) => {
    try {
        const oder = await Oder.findOneAndUpdate(
            { customer: req.query.idCustomer },
            { $pull: { products: { _id: req.query.idObjects } } },
            { safe: true, multi: true }
        )
        res.status(200).json({
            status: "success",
            data: oder
        })
    } catch (error) {
        next(error);
    }
}
//update list products
exports.updateProducts = async (req, res, next) => {
    try {
        var message =''
        const oderUser = await Oder.findOne(
            {
                customer: req.body.customer
            }
        )
        if (oderUser == null) {
            var oder = await Oder.create({
                customer: req.body.customer,
                products: [{
                    id_product: req.body.id_product,
                    quantity: req.body.quantity
                }]
            })
        }
        else {
            const productsOder = await Oder.aggregate([{
                $match: {
                    $and: [
                        { customer: Types.ObjectId(req.body.customer) },
                        { 'products.id_product': Types.ObjectId(req.body.id_product) },
                    ]
                }
            }]).unwind('products');
            if (productsOder.length == 0) {
                var oder = await Oder.findOneAndUpdate(
                    {
                        customer: req.body.customer
                    },
                    {
                        $push: {
                            products: {
                                id_product: req.body.id_product,

                                quantity: req.body.quantity
                            }
                        }
                    }
                )
            }
            else {
                const productsOderCurrent = productsOder.filter(e => e.products.id_product == req.body.id_product)[0];
                const cars = await Cart.findById(req.body.id_product)
                const count = parseInt(req.body.quantity) + parseInt(productsOderCurrent.products.quantity)
                if (count > cars.soluong) {
                    res.status(200).json({
                        message: "Vượt quá số lượng cho phép"
                    })
                    return next();
                } else if (count <= 0) {
                    await Oder.findOneAndUpdate(
                        { customer: req.body.customer },
                        { $pull: { products: { id_product: req.body.id_product } } },
                        { safe: true, multi: true }
                    )
                }
                var oder = await Oder.findOneAndUpdate(
                    {
                        customer: req.body.customer
                    },
                    {
                        "$set": {
                            ["products.$[element].quantity"]: count
                        },

                    },
                    {
                        "arrayFilters": [{
                            "element.id_product": Types.ObjectId(req.body.id_product)
                        }]
                    }
                )
                message='Cập nhật thành công'
                
            }
        }
        res.status(200).json({
            status: "success",
            data: oder,
            message: message
        })
    } catch (error) {
        next(error);
    }
}
