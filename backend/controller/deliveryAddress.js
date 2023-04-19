const DeliveryAddress = require('../models/deliveryAddress');
const { Types } = require("mongoose");
const User = require('../models/user');
exports.create = async (req, res, next) => {
    try {
        var addressCustomer
        const user = await User.findById(req.body.customer)
        if(req.body.infoBill.adress == undefined) {
            req.body.infoBill.adress = user.adress
        }
        addressCustomer = await DeliveryAddress.findOne({ customer: req.body.customer });
        if (!addressCustomer) {
            await DeliveryAddress.create({
                customer: req.body.customer,
                deliveryAddress: [{
                    address: req.body.infoBill.adress
                }]
            })
        }
        else {
            const oldAddress = await DeliveryAddress.aggregate([{
                $match: {
                    $and: [
                        { customer: Types.ObjectId(req.body.customer) },
                        { 'deliveryAddress.address': req.body.infoBill.adress },
                    ]
                }
            }]).unwind('deliveryAddress');
            if (oldAddress) {
                const addressCurrent = oldAddress.filter(e => e.deliveryAddress.address == req.body.infoBill.adress)[0];
                if (addressCurrent == undefined) {
                    addressCustomer = await DeliveryAddress.findOneAndUpdate(
                        {
                            customer: req.body.customer
                        },
                        {
                            $push: {
                                deliveryAddress: {
                                    address: req.body.infoBill.adress,
                                }
                            }
                        }
                    )
                }
            }
        }
        res.status(200).json({
            status: "create DeliveryAddress success",
            data: { addressCustomer },
        });
    } catch (error) {
        next(error);
    }
}
// update 
exports.update = async (req, res, next) => {
    try {
        const adress = await DeliveryAddress.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.status(200).json({
            status: "success",
            data: { adress }
        })
    } catch (error) {
        next(error);
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const adress = await DeliveryAddress.findById(req.params.id)
        // console.log(adress.status);
        adress.status = !adress.status
        await adress.save();
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const adress = await DeliveryAddress.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "deleted",
        })
    } catch (error) {
        next(error);
    }
}
//get all
exports.getOneAddress = async (req, res, next) => {
    try {
        const adress = await DeliveryAddress.findOne({
            customer: req.params.id
        })
            .populate('customer')
        res.status(200).json({
            status: "success",
            results: adress.length,
            data: { adress }
        })
    } catch (error) {
        res.json(error);
    }
}