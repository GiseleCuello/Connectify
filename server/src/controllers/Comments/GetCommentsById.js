const Comment = require("../../models/Comment");

const getById = async (req, res) => {
  try {
    const { professionalId } = req.params;
    const comment = await Comment.find({ professional: professionalId })
      .populate("client") 
      .populate("professional") 
      .exec();

      if (!comment || comment.length === 0) {
      return res.status(404).json({ error: "Comment not found for this professional." });
    }
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: "Error getting comments by professional id." });
  }
};

module.exports = getById;
