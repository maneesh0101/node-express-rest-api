//app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const globalConfig = require('./global.config.js');
const jwt = require('./app/middleware/jwt');
const errorHandler = require('./app/middleware/error-handler');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

const appRoutes = require('./app/app.routes');
app.use('/', appRoutes);

app.use(errorHandler);

let port = globalConfig.port;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});