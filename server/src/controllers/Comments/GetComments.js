const Comment = require("../../models/Comment");

const getComments = async (req,res) => {
    try {
        const comentario = await Comment.find()
        res.status(200).json(comentario)
    }catch (error) {
        res.status(500).json({ error: 'Error creating comments' });
      }
}

module.exports = getComments;