const Client = require("../../models/Client");
const nodemailer = require("nodemailer");

const clientGoogleLogin = async (req, res) => {
  const { email } = req.body;

  try {
    const adminSearch = await Admin.findOne({ email: email });

    if (adminSearch) {
      const passIsMatch = await bcryptjs.compare(
        password,
        adminSearch.password
      );

      if (!passIsMatch) {
        return res.status(400).json({ message: "Password Incorrecto" });
      }

      return res.status(200).json(adminSearch);
    }

    // Verifica si el mail ya existe en la base de datos
    const existingClient = await Client.findOne({ email });

    if (!existingClient) {
      // Extrae la parte del correo electrónico antes del "@" como userName
      const userName = email.split("@")[0];
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
      // Configura el servicio de envío de correos electrónicos
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORDMAIL,
        },
      });
      await newClient.save();
      // Envía un correo electrónico al cliente
      const mailOptions = {
        from: process.env.MAIL,
        to: newClient.email,
        subject: "Gracias por registrarte",
        text: "Gracias por registrarte en nuestra aplicación. Ya podes comenzar a disfrutar de nuestros servicios.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error al enviar el correo electrónico:", error);
        } else {
          console.log("Correo electrónico enviado:", info.response);
        }
      });

      res.status(200).json(newClient);
    } else {
      // Si el usuario ya existe, inicia sesión
      res.status(200).json(existingClient);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en la autenticación de Google.", error });
  }
};

module.exports = clientGoogleLogin;
