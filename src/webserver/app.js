'use strict'

// express
// -----------------
const express = require('express');
const app = express();

// express config
// -
app.disable('x-powered-by');
app.set('view engine', 'pug');

// routes
// -----------------
const api = require('./routes/api');
app.use('/api/v1', api);

const cp = require('./routes/cp');
app.use('/cp', cp);

app.use('/', express.static('./build/'));

module.exports = app;
