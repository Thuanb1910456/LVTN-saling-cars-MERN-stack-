const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: { type: String, trim: true, },
    price: { type: Number, },
    image: { type: String, trim: true },
    describe: { type: String, trim: true },
    soluong: { type: Number },
    giatien: { type: Number },
    status: {type: Boolean},
    tongtien: { type: Number },
    ghichu: { type: String },
    loaiso: { type: String },
    fuel: { type: String },
    color: { type: String },
    wieght: { type: String },
    deleted: {type: Boolean},
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types'
    },
    nhanvien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins'
    }
}, { timestamps: true })

const Products = mongoose.model('products', productsSchema);
module.exports = Products;