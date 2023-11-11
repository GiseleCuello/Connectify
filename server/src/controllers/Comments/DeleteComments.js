const Comment = require("../../models/Comment");

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const existingComment = await Comment.findById(id);

    if (!existingComment) {
      return res.status(400).json({ message: "No se encontró el comentario" });
    }

    const isDeleted = !existingComment.isDeleted;

    const commentUpdate = await Comment.findByIdAndUpdate(
      id,
      { $set: { isDeleted } },
      { new: true }
    )
      .populate("Client")
      .populate("Professional")
      .exec();

    res.status(200).json(commentUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error marking comment as censured" });
  }
};

module.exports = deleteComment;
