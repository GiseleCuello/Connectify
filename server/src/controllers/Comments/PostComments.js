const Comment = require("../../models/Comment");

const postComments = async (req, res) => {
  try {
    const { comment, ranking, clientId, professionalId } = req.body;

    const newComment = await Comment.create({
      comment,
      ranking,
      client: clientId,
      professional: professionalId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comments" });
  }
};

module.exports = postComments;
