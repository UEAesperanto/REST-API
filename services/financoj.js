const express = require('express');
financoj = require('../controllers/financoj');
const app = express();

app.route('/mesagxi')
    .post(financoj.mesagxi);

module.exports = app;
