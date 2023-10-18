const Professional = require("../../models/Professional");

const getProfessionalById = async (req, res) => {
  const { id } = req.params;

  try {
    const professionalFound = await Professional.findById({ _id: id });

    if (!professionalFound) {
      return res.status(400).json({ message: "No se ha podido actualizar" });
    }

    res.status(200).json(professionalFound);
  } catch (error) {
    res.status(500).json({ error: "Error del servido", error });
  }
};

module.exports = getProfessionalById;
