const Professional = require("../../models/Professional");

const professionalDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProfessional = await Professional.findById(id);

    if (!existingProfessional) {
      return res.status(400).json({ message: "No se encontró al profesional" });
    }
    let types = "";
    const isDeleted = !existingProfessional.isDeleted;
    if (existingProfessional.types === "professional") {
      types = "professionat";
    } else {
      if (existingProfessional.types === "professionat") {
        types = "professional";
      } else {
        if (existingProfessional.types === "client") {
          types = "clienl";
        } else {
          if (existingProfessional.types === "clienl") {
            types = "client";
          }
        }
      }
    }
    const professionalUpdate = await Professional.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted, types: types } },
      { new: true }
    );

    res.status(200).json(professionalUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor", error });
  }
};

module.exports = professionalDelete;

// const Professional = require("../../models/Professional");

// const professionalDelete = async (req, res) => {
//   const { id } = req.params;

//   try {
//     req.body.isDeleted = false;

//     const professionalUpdate = await Professional.findByIdAndUpdate(
//       { _id: id },
//       req.body,
//       { new: true }
//     );

//     if (!professionalUpdate) {
//       return res.status(400).json({ message: "No se encontró al usuario" });
//     }

//     res.status(200).json(professionalUpdate);
//   } catch (error) {
//     res.status(500).json({ error: "Error del servido", error });
//   }
// };

// module.exports = professionalDelete;
