const commentsRoute = require('express').Router();
const deleteComment = require('../controllers/Comments/DeleteComments');
const getComments = require('../controllers/Comments/GetComments');
const getById = require('../controllers/Comments/GetCommentsById');
const postComments = require('../controllers/Comments/PostComments');

commentsRoute.post('/', postComments); // Guarda los comentarioslos clientes desde la base de datos

commentsRoute.get('/', getComments); // Trae los comentarios desde la base de datos

commentsRoute.get('/:id', getById);

commentsRoute.patch('/:id/delete', deleteComment); // Borrado logico los comentarios desde la base de datos

module.exports = commentsRoute;
