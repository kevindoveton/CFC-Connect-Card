"use strict"

const path = require('path');

// express
const express = require('express');
const app = express();

// disable powered by express
app.disable('x-powered-by');

// routes
const index = require('./routes/index');
const api = require('./routes/api');
app.use('/api', api);
app.use('/', express.static('./build/'));

module.exports = app;
