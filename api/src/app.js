const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/mercadopago.routes.js');



const server = express();

server.use(cors());

server.name = 'API';

server.use(express.json());

server.use(cookieParser());
server.use(morgan('dev'));

server.use('/mercadopago', require("./routes/mercadopago.routes"));
server.use('/emails', require('./routes/emails.routes'))
server.use(express.json())
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;