const Professional = require("../../models/Professional");

const getProfessionalUpdate = async (req, res) => {
  const { id } = req.params;

  try {
    const professionalUpdate = await Professional.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!professionalUpdate) {
      return res.status(400).json({ message: "No se ha podido actualizar" });
    }

    res.status(200).json(professionalUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor", error });
  }
};

module.exports = getProfessionalUpdate;
