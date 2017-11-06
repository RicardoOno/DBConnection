/**
 * Created by Tadashi on 03/11/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');
var load = require('express-load');
var cors = require('cors');

module.exports = function(){

    var app = express();

    app.use(cors());

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    load('routes', {cwd: 'app'}) //carregar tudo que esta na pasta route
        .then('infra')
        //.then('api')
        .into(app);

    return app;

};