const Product = require('../models/productModel');

/*Importing productModel.js in productCtrl.js enables the controller to access and manipulate the product data using the defined Mongoose model. */
// index.js -> routes -> controllers -> model

/* We are using async and await because all these methods are asynchronous becaues it may take n number of time to fetch the data from the 
data base, so we prefer async and await methods */

// 2. READ (CRUD)
const get = async(req,res) => {
    try{

        const data = await Product.find({},{ __v:0});
        res.status(200);
        res.json(data);
    }catch{
        res.status(500);
        res.send('Internal Server Error')
    }
};

// getById
const getById = async(req,res) => {
    const id = req.params.id;
    // findById() function in Mongoose is used to find a single document in a MongoDB collection by its unique identifier (ID).
    const data = await Product.findById(id,{ __v:0});

    if(!data){
        res.status(500);
        res.send('Internal Server Error');
    }else{
        res.status(200);
        res.json(data);
    }
}

// 1. CREATE (CRUD)
const post = async(req,res) =>{
    try{
        const body = req.body;
        const product = new Product(body);
        await product.save(); // The save() method is a Mongoose function used to save a new document to the MongoDB database.

        res.status(201);
        res.send('Created');
        
    }catch(err){
        res.status(500);
        res.send('Internal Server Error');
    }
}

// 4. DELETE (CRUD)
const remove = async(req,res) => {
    try{
        const id = req.params.id;
        await Product.deleteOne({_id: id});
        res.status(204);
        res.send(); 
    }catch(err){
        res.status(500);
        res.send('Internal Server Error');
    }
}

// 3. UPDATE (CRUD)
const put = async(req,res) => {
    try{
        const id = req.params.id;
        await Product.updateOne({_id: id}, req.body); // req.body is used to access the data sent in the body of an HTTP request.
        res.status(204);
        res.send();
    }catch{
        res.status(500);
        res.send('Internal Server Error');
    }
}

module.exports = {
    get,
    getById,
    post,
    remove,
    put,
}