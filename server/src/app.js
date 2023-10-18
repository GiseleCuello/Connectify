const express = require('express');
const morgan = require('morgan');
const router = require('./router/index');
const fileUpload = require('express-fileupload');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  })
);

app.use('/', router);

module.exports = app;
