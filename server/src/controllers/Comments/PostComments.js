const Comment = require("../../models/Comment");
const Payments = require("../../models/Payments");
const Client = require("../../models/Client");
const Professional = require("../../models/Professional")

const postComment = async (req, res) => {
  try {
    const { comment, client, professionalId, ranking, } = req.body;

    // Busca al cliente por su nombre de usuario
    const clientDoc = await Client.findOne({ userName: client });

    if (!clientDoc) {
      return res.status(400).json({ error: "Client not found." });
    }
    const payment = await Payments.findOne({
      
        professionalId,
        userName: client, // Compara el nombre de usuario en lugar del clientId
        isCompleted: "approved",
   
    });
  
    if (!payment) {
      console.log(payment, 400)
      return res.status(400).json({ error: "You are not authorized to leave a comment for this professional." });
    }

    const newComment = new Comment({
      comment,
      ranking,
      Client: clientDoc._id, // Asociamos al cliente por su ID
      Professional: professionalId, // Asociamos al profesional por su ID
    });

     // Guarda el comentario
     await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment", error });
  }
};

module.exports = postComment;
