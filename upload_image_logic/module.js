var mongoose = require('mongoose');
var image_schema = new mongoose.Schema({
    name:String,
    desc:String,
    img:{
        data: Buffer,
        content_type: String
    }
});

module.exports = mongoose.model('Image', image_schema);
