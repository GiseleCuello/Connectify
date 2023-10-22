const Comment = require("../../models/Comment");

const getComments = async (req, res) => {
  try {
    const comentario = await Comment.find()
      .populate("client") 
      .populate("professional") 
      .exec();
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ error: "Error creating comments" });
  }
};

module.exports = getComments;
