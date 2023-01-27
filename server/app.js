const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jsonServer = require('json-server');

const corsOptions = {
  origin: [/localhost/, /tjx/, /azurewebsites/],
};

let app = express();

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use(router);

app.set('json spaces', 2);

module.exports = app;
