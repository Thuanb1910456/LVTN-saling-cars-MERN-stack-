const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    status : Boolean,
    name: { type: String },
    email: { type: String },
    sdt: { type: String },
    content: { type: String },
    adress: { type: String },
    image: { type: String },
}, { timestamps: true })

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;