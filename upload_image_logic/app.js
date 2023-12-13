var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
var img_save = require('./module.js');
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

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});
 
var upload = multer({ 
    storage: storage,
    limits:{fieldSize : 5000000} // 5MB
});
 
app.get('/', (req, res) => {
    img_save.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.render('web_html.ejs',{items: data})
    })
});

app.post('/', upload.single('image'), (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img:{
            data: fs.readFileSync(path.join('/Users/harry/Desktop/snake_game/upload/' + req.file.filename )),
            contentType: 'image/png'
        }
    };
    img_save.create(obj)
    .then((err, item) => {
        if(err){
            console.log(err);
        }
        else{
            // save images
            res.redirect('/');
        }
    });
});

var port = process.env.PORT || '3000';
app.listen(port, err =>{
    if(err)
        throw err;
    console.log('Server listening on port', port);
});