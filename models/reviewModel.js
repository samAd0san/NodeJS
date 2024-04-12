const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    productId : { type : String, required : true },
    subject : { type : String, required : true },
    message : { type : String },
    rating : { type : Number },
    createdDate : { type : Date, required: true },
    updatedDate : { type : Date, default : Date.now }
});

module.exports = mongoose.model('review',schema);