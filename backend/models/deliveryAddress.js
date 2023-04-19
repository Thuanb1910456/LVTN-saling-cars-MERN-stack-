const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    deliveryAddress: [
        {
            address: { type: String }
        }
    ],
}, { timestamps: true })

const DeliveryAddress = mongoose.model('deliveryAddress', deliveryAddressSchema);
module.exports = DeliveryAddress;