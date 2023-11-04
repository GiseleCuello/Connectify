const Comment = require("../../models/Comment");
const Payments = require("../../models/Payments");
const Client = require("../../models/Client");
const Professional = require("../../models/Professional")

const postComment = async (req, res) => {
  try {
    const {comment, ranking, clientId, professionalId, approve} = req.body;
// Determinar el campo a utilizar para buscar el pago
let clientField;
if (typeof clientId === "string" && clientId.includes("gmail")){
  clientField = "nickname"; // Si la autenticación es a través de Google
} else {
  clientField = "userName"; // Si la autenticación es local
}
    const payment = await Payments.findOne({
      [clientField]: clientId,
      professionalId,
      isCompleted: approve,
    });

    if (!payment) {  console.log(payment, "400");
      return res.status(400).json({ error: "Will be realice a purchase" });
    
    }

    const newComment = await Comment.create({
      comment,
      ranking,
      clientId,
      professionalId,
    });
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating comment", error });
  }
};

module.exports = postComment;
