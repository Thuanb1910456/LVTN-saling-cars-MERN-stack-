const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
    name_customer: { type: String },
    adress: { type: String },
    sdt: { type: String },
    pay: { type: String },
    status: { type: String },
    total: { type: Number },
    products: [{
        id_product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
    
        quantity: Number,
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    nhanvien: { type: String },
    sdtnhanvien: { type: String }
}, { timestamps: true })

const Bill = mongoose.model('bills', billSchema);
module.exports = Bill;