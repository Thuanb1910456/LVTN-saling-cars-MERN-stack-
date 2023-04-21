const Bill = require("../models/bill.js")
const Oder = require('../models/oder.js')
var nodemailer = require('nodemailer');
const Admin = require("../models/admin");
const Products = require('../models/products')
exports.create = async (req, res, next) => {
    try {
        var message = '';
        const oder = await Oder.findOne({ customer: req.body.customer })
            .populate('customer')
        if (req.body.infoBill.pay == undefined || req.body.infoBill.pay == 'Thanh toán khi nhận hàng' || req.body.infoBill.pay == '--Lựa chọn--') {
            req.body.infoBill.pay = 'Thanh toán khi nhận hàng'
        }
        if (oder.products.length != 0) {
            const bill = await Bill.create({
                status: 'Chờ xác nhận',
                name_customer: req.body.infoBill.name_customer,
                sdt: req.body.infoBill.sdt,
                adress: req.body.infoBill.adress,
                pay: req.body.infoBill.pay,
                total: req.body.infoBill.total,
                customer: req.body.customer,
                products: []
            });

            if (bill.pay == 'Thanh toán online') {
                await Bill.findByIdAndUpdate({ _id: bill._id }, {
                    pay: "Đã thanh toán"
                })
            }

            oder.products.forEach(async (e) => {
                await Bill.findOneAndUpdate(
                    {
                        _id: bill._id
                    },
                    {
                        $push: {
                            products: {
                                id_product: e.id_product._id,
                                quantity: e.quantity
                            }
                        }
                    }
                )
                var product = await Products.findById({ _id: e.id_product._id })
                await Products.findOneAndUpdate({
                    _id: product._id,
                }, {
                    soluong: product.soluong - e.quantity
                })
                await Oder.findOneAndUpdate(
                    {
                        customer: req.body.customer
                    },
                    {
                        $pull: {
                            products: { id_product: e.id_product._id }
                        }
                    }
                )

            })

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
                to: oder.customer.email,
                subject: 'TN-CARS VIỆT NAM',
                html:
                    `   
                        <style>
                        h3 {
                            color: blue,
                        }
                        h4 {
                            font-weight: bold,
                        }
                        p {
                            font-size: 18px,
                        }
                        </style>
                        <div>
                            <h3>Xin chào ${oder.customer.name}</h3>
                            <p>Bạn vừa đặt hàng với tổng giá trị là: ${bill.total} VNĐ. </p>
                            <p>Vui lòng kiểm tra email thương xuyên để biết trạng thái đơn hàng của bạn.</p>
                            <h4>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe.</h4>
                        </div>
                    `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            message = 'thanh cong'
        }
        else {
            message = 'khong thanh cong'
        }
        res.status(200).json({
            status: 'success',
            message: message
        })
    } catch (error) {
        next(error)
    }
}
// update 
exports.update = async (req, res, next) => {
    try {
        const currentBill = await Bill.findById(req.params.id)
            .populate('customer')
        var bill
        var nhanvien
        if (currentBill.status === 'Đã giao hàng thành công' || currentBill.status === 'Đơn hàng đã bị hủy bỏ') {
            bill = await Bill.create({
                status: 'Chờ xác nhận',
                name_customer: currentBill.name_customer,
                sdt: currentBill.sdt,
                adress: currentBill.adress,
                pay: currentBill.pay,
                total: currentBill.total,
                customer: currentBill.customer,
                products: currentBill.products,
            })
            currentBill.products.forEach(async (e) => {
                var product = await Products.findById({ _id: e.id_product._id })
                if (product.soluong < e.quantity || product.soluong == 0) {
                    var message = 'Tạm hết hàng'
                    return next();
                }
                else {
                    await Products.findOneAndUpdate({
                        _id: product._id,
                    }, {
                        soluong: product.soluong - e.quantity
                    })
                }
            })
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
                to: currentBill.customer.email,
                subject: 'TN-CARS VIỆT NAM',
                html:
                    `   
                        <style>
                        h3 {
                            color: blue,
                        }
                        h4 {
                            font-weight: bold,
                        }
                        p {
                            font-size: 18px,
                        }
                        </style>
                        <div>
                            <h3>Xin chào ${currentBill.customer.name}</h3>
                            <p>Bạn vừa đặt hàng với tổng giá trị là: ${bill.total} VNĐ. </p>
                            <p>Vui lòng kiểm tra email thương xuyên để biết trạng thái đơn hàng của bạn.</p>
                            <h4>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe.</h4>
                        </div>
                    `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        else {
            if (req.body.nhanvien != undefined) {
                nhanvien = await Admin.findById(req.body.nhanvien)
                bill = await Bill.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                    nhanvien: nhanvien.hoten,
                    sdtnhanvien: nhanvien.sdt
                }, { new: true })
                    .populate('customer')

            } else {
                bill = await Bill.findByIdAndUpdate(req.params.id, {
                    ...req.body
                }, { new: true })
                    .populate('customer')
            }

            if (req.body.status == "Đơn hàng đã bị hủy bỏ") {
                const billreturn = await Bill.findOne({ _id: req.params.id })
                console.log(billreturn);
                billreturn.products.forEach(async value => {
                    const product = await Products.findById({ _id: value.id_product })
                    product.soluong = product.soluong + value.quantity
                    await product.save();
                })

            }

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
                to: bill.customer.email,
                subject: 'TN-CARS VIỆT NAM',
                html:
                    `   
                        <style>
                        h3 {
                            color: blue,
                        }
                        h4 {
                            font-weight: bold,
                        }
                        p {
                            font-size: 18px,
                        }
                        </style>
                        <div>
                            <h3>Xin chào ${bill.customer.name}</h3>
                            <p>Đơn hàng với tổng giá trị là: ${bill.total} VNĐ.  </p>
                            <p>Thông tin đơn hàng của bạn: ${bill.status}</p>
                            <h4>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe.</h4>
                        </div>
                    `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        res.status(200).json({
            status: "success",
            data: { bill },
            nhanvien: { nhanvien },
        })
    } catch (error) {
        next(error);
    }
}
//update status
exports.updateStatus = async (req, res, next) => {
    try {
        const bill = await Bill.findById(req.params.id)
        bill.status = !bill.status
        await Bill.save();
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
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
        var total = 0;
        const bill = await Bill.find()
            .populate('customer')
            .populate({
                path: 'products',
                populate: { path: 'id_product' }
            })
        bill.forEach(element => {
            if (element.status == 'Đã giao hàng thành công') {
                total += element.total
            }
        });
        res.status(200).json({
            status: "success",
            results: bill.length,
            data: { bill },
            total: total
        })
    } catch (error) {
        res.json(error);
    }
}
// getbill of status
exports.getStatus = async (req, res, next) => {
    try {
        var bill = []
        if (req.query.nhanvien !== undefined) {
            const nhanvien = await Admin.findById(req.query.nhanvien)
            // console.log(nhanvien);
            bill = await Bill.find(
                {
                    nhanvien: nhanvien.hoten,
                    status: req.query.status,
                    sdtnhanvien: nhanvien.sdt
                }
            )
                .populate('customer')
                .populate({
                    path: 'products',
                    populate: { path: 'id_product' }
                })
        }
        else {
            bill = await Bill.find({ status: req.query.status })
                .populate('customer')
                .populate({
                    path: 'products',
                    populate: { path: 'id_product' }
                })
        }
        res.status(200).json({
            status: "success",
            results: bill.length,
            data: bill
        })
    } catch (error) {
        res.json(error);
    }
}
//get one
exports.getOne = async (req, res, next) => {
    try {
        const bill = await Bill.findById(req.params.id)
            .populate('customer')
            .populate({
                path: 'products',
                populate: { path: 'id_product' }
            })
        res.status(200).json({
            status: "success",
            data: { bill }
        })
    } catch (error) {
        res.json(error);
    }
}
//get Bill of user
exports.getBillOfUser = async (req, res, next) => {
    try {
        const bill = await Bill.find({
            customer: req.params.id
        }).populate('customer')
            .populate({
                path: 'products',
                populate: { path: 'id_product' }
            });
        res.status(200).json({
            status: "success",
            data: bill
        })
    } catch (error) {
        next(error);
    }
}
//delete one
exports.deleteOneBill = async (req, res, next) => {
    try {
        const bill = await Bill.findOneAndUpdate(
            { customer: req.query.idCustomer },
            { $pull: { products: { _id: req.query.idObjects } } },
            { safe: true, multi: true }
        )
        res.status(200).json({
            status: "success",
            data: bill
        })
    } catch (error) {
        next(error);
    }
}