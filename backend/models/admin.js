const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    hoten:{type:String, trim: true},
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    avt: { type: String },
    sdt: { type: String },
    adress: { type: String },
    sex: { type: String },
    date: { type: String },
    chucvu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'position'
    },
    status: {type: Boolean},
}, { timestamps: true })

const Admin = mongoose.model('admins', adminSchema);
module.exports = Admin;