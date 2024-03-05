const User = require('../models/userModel');    

const add = (data) => {
    const user = new User(data);
    return user.save(); 
}

// Checking whether the email id entered by the user already exists in the database or not
const findByEmail = async(email) => {
    try{
        const user = await User.findOne({email: email});
        return user;
    }catch(err){
        throw error;
    }
}

module.exports = {
    add,
    findByEmail,
}