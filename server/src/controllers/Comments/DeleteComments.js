const Comment = require("../../models/Comment");

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentUpdate = await Comment.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .populate("client") 
      .populate("professional") 
      .exec();
    if (!commentUpdate) {
      res.status(404).json("Comment not found");
    }
    res.status(200).json(commentUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error marking comment as deleted" });
  }
};

module.exports = deleteComment;
