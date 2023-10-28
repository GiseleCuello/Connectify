const Client = require("../../models/Client");

const clientGoogleLogin = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica si el mail ya existe en la base de datos
    const existingClient = await Client.findOne({ email });

    if (!existingClient) {
      // Si el mail no existe, crea un nuevo registro
      const newClient = new Client({
        email,
        isGoogleUser: true, // Lo marcar como usuario de Google
      });

      await newClient.save();

      res
        .status(200)
        .json({ message: "Usuario de Google registrado con éxito." });
    } else {
      // Si el usuario ya existe inicia sesión

      res.status(200).json({ message: "Inicio de sesión exitoso." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en la autenticación de Google.", error });
  }
};

module.exports = clientGoogleLogin;
