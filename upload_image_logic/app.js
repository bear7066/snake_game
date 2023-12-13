var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
var img_logic = require('./module.js');
var fs = require('fs');
var path = require('path');
const bodyParser = require('body-parser');

var app = express();

app.set("view engine", "ejs");
require('dotenv').config();

mongoose.connect(process.env.MONGO._URL).then(console.log("DB Connected"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var multer = require('multer');
