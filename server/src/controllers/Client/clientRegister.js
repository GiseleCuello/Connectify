const Client = require("../../models/Client");
<<<<<<< HEAD
const Professional = require("../../models/Professional");
const uploadImage = require("../Utils/Cloudinary");
=======
>>>>>>> 34fb7b7c21e202cd633c80fecf9822216660dc60

const clientRegister = async (req, res) => {
  try {
    const { name, lastName, userName, email, province, location, password } =
      req.body;
<<<<<<< HEAD

    const result = await uploadImage(req.files.image.tempFilePath);
    //Busco usuario ya registrado con ese nombre...
    const checkProf = await Professional.findOne({
      $or: [{ email: email }, { userName: userName }],
    });
    const checkClient = await Client.findOne({
      $or: [{ email: email }, { userName: userName }],
=======

    const result = await uploadImage(req.files.image.tempFilePath);

    // Busca si ya existe un usuario registrado con ese correo o userName
    const existingUser = await Client.findOne({
      $or: [{ email }, { userName }],
>>>>>>> 34fb7b7c21e202cd633c80fecf9822216660dc60
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
