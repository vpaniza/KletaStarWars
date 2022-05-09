var mongoose = require('mongoose');
  
var image = new mongoose.Schema({
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
module.exports = new mongoose.model('Image', image);