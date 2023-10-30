const chatRoute = require('express').Router();
const getMessages = require('../controllers/Chat/getAllMessages');
const saveMessage = require('../controllers/Chat/saveMessage');

chatRoute.get('/messages', getMessages);
chatRoute.post('/save', saveMessage);

module.exports = chatRoute;
