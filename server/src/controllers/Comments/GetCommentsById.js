const Comment = require("../../models/Comment");

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id)
      .populate("client") 
      .populate("professional") 
      .exec();

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: "Error getting comment." });
  }
};

module.exports = getById;
