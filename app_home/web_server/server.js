/**
 * @file 
 * Script de inicializacao do Web Server
 * 
 * Carrega as Rotas, Middlewares, Log, etc.
 *
 */
"use strict";

const express = require("express");
const morgan = require('morgan');
const path = require("path");
const helmet = require('helmet');
const compression = require('compression');

const winston = require('./winston');
const app = express();

// CORS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Content-Length, Accept, Authorization, X-Auth-Token"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, OPTIONS, HEAD"
    );

    // Intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }

});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Logger
app.use(morgan('tiny', {
    stream: winston.stream
}));

// Modulo que ajuda a melhorar seguranca
app.use(helmet());

// Text Compression
app.use(compression());

winston.info("Node Midlewares carregados...");

// Aponta para os assets do Cordova >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use(express.static(path.join(__dirname, '..', 'react/build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'react', 'build', 'index.html'));
});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const port = process.env.renault_risk_PORT;
app.listen(port);

winston.info(`NODE_ENV: ${process.env.NODE_ENV}`);
winston.info(`DIRNAME: ${path.join(__dirname, '..', 'react/build')}`);
winston.info(`HOSTNAME: ${process.env.HOST}`);
winston.info(`Running at Port ${port}`);

// EOF
