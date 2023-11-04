const Comment = require("../../models/Comment");
const Payments = require("../../models/Payments");
const Client = require("../../models/Client");
const Professional = require("../../models/Professional")

const postComment = async (req, res) => {
  try {
    const { comment, ranking, clientId, professionalId, approve, paymentId } = req.body;
let clientField;
    if(client){
    const payment = await Payments.findOne({
      _id: paymentId,
      clientId,
      professionalId,
      isCompleted: approve,
    });
  }
    if (!payment) {
      return res.status(400).json({ error: "Will be realice a purchase" });
    }

    const newComment = await Comment.create({
      comment,
      ranking,
      Client: clientId,
      Professional: professionalId,
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment", error });
  }
};

module.exports = postComment;
