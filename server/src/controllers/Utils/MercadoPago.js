require('dotenv').config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const MERCADOPAGO_SUCCESS = process.env.MERCADOPAGO_SUCCESS;
const MERCADOPAGO_FAILURE = process.env.MERCADOPAGO_FAILURE;

const mercadopago = require("mercadopago");

mercadopago.configure({
access_token: ACCESS_TOKEN,
});

const mercadoPago = (req, res) => {
// Datos que vienen por body desde el FRONT.
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      }
    ],
    back_urls: {
      "success": MERCADOPAGO_SUCCESS,
      "failure": MERCADOPAGO_FAILURE,
      "pending": ""
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id    //! Mando el id del pago al FRONT
      });
    })
    .catch(function (error) {
      console.log(error);
    });

};

module.exports = mercadoPago;
