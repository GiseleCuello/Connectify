const Comment = require("../../models/Comment");

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const comment = await Comment.findById(id)
      .populate("Client")
      .populate("Professional")
      .exec();

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error getting comment." });
  }
};

module.exports = getById;
