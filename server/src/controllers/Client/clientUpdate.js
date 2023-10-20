const Client = require("../../models/Client");

const clientUpdate = async (req, res) => {
    const {id} = req.params;

    try {
        const clientSearch = await Client.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new:true},
        );

        if (!clientSearch){
            return res.status(400).json({message:"No se pudo actualizar al Cliente"});
        }

        res.status(200).json(clientSearch);

    } catch (error) {
        res.status(500).json({error: "Error del servidor", error})
    }
};


module.exports = clientUpdate;