const messageAdmin = require('express').Router();
const NewMessageAdmin = require('../controllers/NewMessageAdmin/NewMessageAdmin');

messageAdmin.post('/message', NewMessageAdmin);

module.exports = messageAdmin;
