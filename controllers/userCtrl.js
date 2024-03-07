const bcrypt = require('bcrypt');
const userRepo = require('../repositories/userRepo');

const signup = async(req,res) => {  
    try{
        const playload = req.body;

        /* the code hashes the password received in the request body using bcrypt with a cost 
        factor of 2, then logs the modified payload object to the console. */
        playload.password = await bcrypt.hash(playload.password,2);
        console.log(playload); // This will print the body with (encrypted password) entered by the user at the cmd itself

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

module.exports = {
    signup,
}