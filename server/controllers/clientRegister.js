const Client = require('../src/models/Client')


const clientRegister = async (req, res) => {
    console.log('Req: ', req.body);

    try {
        const { name, lastName, email, image, address, CustomerComments } = req.body;
        
        // Crea una nueva instancia de Cliente utilizando el modelo
        
        const newClient = new Client({
            name,
            lastName,
            email,
            image,
            address,
            CustomerComments,
        });

        await newClient.save();

        res.status(201).json({ message: 'Cliente registrado con éxito' });

    } catch (error) {
        console.log('Error clientRegister...', error);
        res.status(500).json({ error: 'Error al registrar el cliente' });
    }



}





module.exports = clientRegister;