const Comment = require("../../models/Comment");

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const commentUpdate = await Comment.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!commentUpdate) {
      res.status(404).json("Not found");
    }
    res.status(200).json(commentUpdate);
  } catch (error) {
    res.status(500).json({ error: message.error });
  }
};

module.exports = deleteComment;
