const Client = require("../../models/Client");
const Professional = require("../../models/Professional");
const uploadImage = require("../Utils/Cloudinary");

const clientRegister = async (req, res) => {
  try {
    const { name, lastName, userName, email, province, location, password } =
      req.body;

    const result = await uploadImage(req.files.image.tempFilePath);
    //Busco usuario ya registrado con ese nombre...
    const checkProf = await Professional.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    const checkClient = await Client.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (checkProf || checkClient) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    // Creo una nueva instancia de Cliente...
    const newClient = new Client({
      name,
      lastName,
      userName,
      email,
      image: result.secure_url,
      password,
      province,
      location,
    });

    await newClient.save();

    res.status(201).json({ message: "Successfully registered client." });
  } catch (error) {
    res.status(501).json({ error: "Error registering client...!", error });
  }
};

module.exports = clientRegister;
