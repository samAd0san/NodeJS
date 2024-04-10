const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {
        type: String,
        required : [true, 'First name is mandatory'],
        minLength : [3, 'minimun length should be 3'],
        maxLength : [20, 'maximum length should be 20']
    },
    lastName: {
        type : String,
        required : [true, 'Last name is required']
    },
    email: {
        type: String,
        unique: true,
        validate : {
            validator : function(value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message : 'Invalid Email'
        }
    },
    password: {type: String},
    active: {type: Boolean,default: true},
    role : {type : String, default: 'User'},
    createdDate: {type: Date},
    updatedDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('users',schema);