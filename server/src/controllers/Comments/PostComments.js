const Comment = require("../../models/Comment");
const Professional = require("../../models/Professional");
const Purchase = require("../../models/Purchase");

const postComments = async (req, res) => {
  try {
    const { comment, ranking, clientId, professionalId } = req.body;

    // Verificar la autenticación del cliente
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    // Verifica si el usuario tiene un historial de compras
const hasPurchases = await Purchase.find({ client: clientId }).countDocuments() > 0;
if (!hasPurchases) {
  return res.status(400).json({ error: "You must make a purchase before leaving a review." });
}

// Verifica cuántas reseñas ha dejado el usuario para este profesional
const numberOfReviews = await Comment.find({ client: clientId, professional: professionalId }).countDocuments();
if (numberOfReviews >= 1) {
  return res.status(400).json({ error: "You can leave only one review per professional." });
}


    // Validar los datos de entrada
    if (!comment || !ranking || !clientId || !professionalId) {
      return res.status(400).json({ error: "Invalid data. Please provide all required fields." });
    }



    const newComment = await Comment.create({
      comment,
      ranking,
      client: clientId,
      professional: professionalId,
    });

    // Actualizar la calificación promedio del profesional
    const comments = await Comment.find({ professional: professionalId });
    const totalRanking = comments.reduce((acc, curr) => acc + curr.ranking, 0);
    const avgRanking = totalRanking / comments.length;
    
    
    // Actualizar la calificación promedio en el perfil del profesional
    await Professional.findByIdAndUpdate(professionalId, { averageRanking: avgRanking });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comments" });
  }
};

module.exports = postComments;
