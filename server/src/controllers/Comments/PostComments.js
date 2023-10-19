const Comment = require("../../models/Comment");

const postComments = async (req, res) => {
  try {
    const comentarios = req.body;

    const newComment = await Comment.create(comentarios);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comments" });
  }
};

module.exports = postComments;
