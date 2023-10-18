const Client = require("../../models/Client");
const Professional = require("../../models/Professional");

const clientRegister = async (req, res) => {
  try {
    const { name, lastName, userName, email, image, address, password } =
      req.body;

    //Busco usuario ya registrado con ese nombre...
    const checkProf = await Professional.findOne({
      $or: [{ email: email }, { username: userName }],
    });
    const checkClient = await Client.findOne({
      $or: [{ email: email }, { username: userName }],
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
      image,
      password,
      address,
    });

    await newClient.save();

    res.status(201).json({ message: "Successfully registered client." });
  } catch (error) {
    res.status(500).json({ error: "Error registering client." });
  }
};

module.exports = clientRegister;
