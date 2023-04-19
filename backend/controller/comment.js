const Comment = require('../models/comment');
exports.create = async (req, res, next) => {
    req.body.status = true;
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json({
            status: "create Comment success",
            data: { comment }
        });
    } catch (error) {
        next(error);
    }
}
// update 
exports.update = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.status(200).json({
            status: "success",
            data: { comment }
        })
    } catch (error) {
        next(error);
    }
}
//updateSatus
exports.updateStatus = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        comment.status = !comment.status
        await comment.save();
    } catch (error) {
        next(error);
    }
}
//delete
exports.delete = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "deleted",
        })
    } catch (error) {
        next(error);
    }
}
//get all
exports.getAll = async (req, res, next) => {
    try {
        const comment = await Comment.find({})
        .populate('customer')
        .populate('products') 
        res.status(200).json({
            status: "success",
            results: comment.length,
            data: { comment }
        })
    } catch (error) {
        res.json(error);
    }
}
//get one
exports.getOneComment = async (req, res, next) => {
    try{
        const comment = await Comment.find(
            {products : req.params.id}
        )
        .populate ('customer')
        res.status(200).json({
            status: "success",
            results: comment.length,
            data: { comment }
        })
    }catch(error) {
        res.json(error)
    }
}