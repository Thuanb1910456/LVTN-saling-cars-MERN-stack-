const mongoose = require('mongoose');

const oderSchema = new mongoose.Schema({
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
}, { timestamps: true })

const Oder = mongoose.model('oders', oderSchema);
module.exports = Oder;