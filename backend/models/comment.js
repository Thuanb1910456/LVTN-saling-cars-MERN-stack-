const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String ,
    status: Boolean ,
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
}, { timestamps: true })

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;