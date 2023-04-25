const mongoose = require('mongoose');

const typesSchema = new mongoose.Schema({
   name: { type: String, require: true, trim: true },
   logo: { type: String, require: true },
   status:{type:Boolean},
   deleted: {type: Boolean},
}, { timestamps: true })

const Types = mongoose.model('types', typesSchema);
module.exports = Types;