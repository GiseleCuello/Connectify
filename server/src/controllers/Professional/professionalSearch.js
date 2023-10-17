const Professional = require("../../models/Professional");

const professionalSearch = async (req, res) => {
  const { profession } = req.params;

  try {
    const professionalFound = await Professional.find({ profession });

    if (!professionalFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(professionalFound);
  } catch (error) {
    res.status(500).json({ error: "Error del servido", error });
  }
};

module.exports = professionalSearch;
