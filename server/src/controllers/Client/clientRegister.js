const uploadImage = require("../Utils/Cloudinary");
const Client = require("../../models/Client");

const clientRegister = async (req, res) => {
  try {
    const { name, lastName, userName, email, province, location, password } =
      req.body;

    const result = await uploadImage(req.files.image.tempFilePath);

    // Busca si ya existe un usuario registrado con ese correo o userName
    const existingUser = await Client.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    // Crea una nueva instancia de Cliente
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
    res.status(500).json({ error: "Error registering client...!", error });
  }
};

module.exports = clientRegister;
