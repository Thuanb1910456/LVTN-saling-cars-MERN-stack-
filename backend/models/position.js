const mongoose = require('mongoose');
const positionSchema = new mongoose.Schema({
    tenchucvu : {type:String},
    luong : {type:String}
}, { timestamps: true })

const Position = mongoose.model('position', positionSchema);
module.exports = Position;