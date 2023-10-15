const Client = require('../models/Client')


exports.clientRegister = async (req, res) => {
    try {
        const { name, lastName, email, image, address, password } = req.body;

        // Crea una nueva instancia de Cliente utilizando el modelo

        const newClient = new Client({
            name,
            lastName,
            email,
            image,
            password,
            address,
        });

        await newClient.save();

        res.status(201).json({ message: 'Successfully registered client.' });

    } catch (error) {
        res.status(500).json({ error: 'Error registering client.' });
    }
};