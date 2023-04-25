const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name : {type:String, require:true },
    email: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    avt: { type: String },
    sdt: { type: String },
    adress:{type:String},
    status: {type: Boolean},
}, { timestamps: true })

const User = mongoose.model('user', usersSchema);
module.exports = User;