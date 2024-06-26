const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepo');
const config = require('../config/index');
const logger = require('../utils/logger');

/*
const signup1 = async(req,res) => {  
    try{
        const playload = req.body;

        // the code hashes the password received in the request body using bcrypt with a cost 
        // factor of 2, then logs the modified payload object to the console. 
        playload.password = await bcrypt.hash(playload.password,2);
        // console.log(playload); // This will print the body with (encrypted password) entered by the user at the cmd itself

        playload.createdDate = new Date();

        // If the user input consist of existing email in db, reject it
        const emailExists = await userRepo.findByEmail(playload.email);
        if(emailExists) {
            return res.status(400).send('Email Already exists');
        }
        await userRepo.add(playload);
        res.status(201).send('Created');

    }catch{
        res.status(500).send('Internal Server Error');
    }
}; 
*/

const emailExists = (err) => err.message && err.message.indexOf('duplicate key error') > -1
const signup = async(req,res) => {
    try {
        // logger.info('signup started');
        const payload = req.body;
        payload.password = await bcrypt.hash(payload.password,2);
        payload.createdDate = new Date();

        await userRepo.add(payload);
        res.status(201).send('Created');
    } catch (err) {
        // logger.error({
        //     location : 'userCtrl',
        //     err : err
        // });
        console.error(err.message);
        if(emailExists(err)){
            // console.error(emailExists(err));
            res.status(400).send('Email Already Exists');
        }else{
            res.status(500).send('Internal Server Error');
        }
    }
};

const signin = async(req,res) => {
    try{
        const payload = req.body;
        // hardcoded - User/Admin (This will change the default role of the user)
        payload.role = 'Admin';

        // we are taking email as an input from the user
        const dbUser = await userRepo.getUserByEmail(payload.email);
        if(!dbUser) {
            // checking if the email entered is valid or not
            res.status(401).send('Invalid email or password');
            return;
        }

        // comparing the password of entered email with the email in the database
        const isValid = await bcrypt.compare(payload.password,dbUser.password);
        if(isValid) {
            // This will not work if the password of the user in db is not encrypted, it should be encrypted
            res.status(200).json({
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                // jwt.sign is used for generating JSON Web Tokens
                token: jwt.sign({email : dbUser.email,role : dbUser.role},config.jwtSecret,{expiresIn : '1d'})
            });
        }else{
            // checking if the password entered is valid or not
            res.status(401).send('Invalid email or password');
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    signup,
    signin,
}