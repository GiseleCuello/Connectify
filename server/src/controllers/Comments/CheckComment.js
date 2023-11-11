const Comment = require("../../models/Comment");

const checkComment = async (req, res) => {
  const { id } = req.pamas;
  try {
    const toCheck = await Comment.findById(id);
    if (!toCheck) {
      res
        .status(400)
        .json({ message: "No se ancontro comentario con el ID" + id });
    }
    const isChecked = !toCheck.isChecked;
    await Comment.findByIdAndUpdate(id, { $set: isChecked }, { new: true });

    res.status(200).json(isChecked);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor", error });
  }
};
module.exports = checkComment;
