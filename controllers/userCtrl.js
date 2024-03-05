const userRepo = require('../repositories/userRepo');

const signup = async(req,res) => {  
    try{
        const playload = req.body;
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