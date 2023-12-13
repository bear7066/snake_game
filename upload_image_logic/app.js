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

mongoose.connect(process.env.MONGO_URL).then(console.log("DB Connected"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var multer = require('multer');

const upload = multer({
    // 1MB
    limits:{ fileSize:1000000 },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please upload the correct images file'))
        }
        // call_back function
        cb(null, true)
    }
});

app.get('/', (req, res) => {
    img_logic.find({})
    .then((data, err) => {
        if(err){
            console.log(err);
        }
        res.render('image.ejs', {items: data});
    });
});

var port = process.env.PORT || '3000';
app.listen(port, err =>{
    if(err)
        throw err;
    console.log('Server listening on port', port);
});