const Client = require("../../models/Client");

const clientGoogleLogin = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Verifica si el mail ya existe en la base de datos
      const existingClient = await Client.findOne({ email });
  
      if (!existingClient) {
        // Extrae la parte del correo electrónico antes del "@" como userName
        const userName = email.split('@')[0];
        let newUserName = userName;
        let count = 1;
  
        // Verifica la unicidad de userName
        while (await Client.findOne({ userName: newUserName })) {
          count++;
          newUserName = `${userName}${count}`;
        }
  
        // Si el mail no existe, crea un nuevo registro con un userName único
        const newClient = new Client({
          email,
          isGoogleUser: true, // Marcarlo como usuario de Google
          userName: newUserName,
        });
  
        await newClient.save();
  
        res
          .status(200)
          .json({ message: "Usuario de Google registrado con éxito." });
      } else {
        // Si el usuario ya existe, inicia sesión
        res.status(200).json({ message: "Inicio de sesión exitoso." });
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Error en la autenticación de Google.", error });
    }
  };
  
  module.exports = clientGoogleLogin;