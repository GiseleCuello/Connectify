const Admin = require("../../models/Admin");

const adminRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Crea una nueva instancia Administrador
    const admin = new Admin({
      userName,
      email,
      password,
    });

    await admin.save();

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Error registering client...!", error });
  }
};

module.exports = adminRegister;
