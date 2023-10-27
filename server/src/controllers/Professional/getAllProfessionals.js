const Professional = require("../../models/Professional");

const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.find().exec();
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllProfessionals;
