const adsRoute = require('express').Router();
const createAd = require('../controllers/Ads/createAd');
const getAllAds = require('../controllers/Ads/getAllAds');
const getAdById = require('../controllers/Ads/getAdById');
const updateAdById = require('../controllers/Ads/updateAdById');
const deleteAdById = require('../controllers/Ads/deleteAdById');
const filtersCombined = require('../controllers/Filters/FiltersCombined');

adsRoute.post('/', createAd); // Guarda los avisos desde la base de datos

adsRoute.get('/', getAllAds); // Trae los avisos desde la base de datos

adsRoute.get('/filters', filtersCombined); // Muestra los filtros aplicados

adsRoute.get('/:id', getAdById); // Trae los avisos desde la base de datos

adsRoute.patch('/:id', updateAdById); // Actualizar los avisos desde la base de datos

adsRoute.patch('/:id/delete', deleteAdById); // Borrado lógico los avisos desde la base de datos

module.exports = adsRoute;
