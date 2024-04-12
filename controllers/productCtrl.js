// const Product = require('../models/productModel'); // shifted to productRepo.js
const ProductRepo = require('../repositories/productRepo');
const reviewRepo = require('../repositories/reviewRepo');
const logger = require('../utils/logger');

/*Importing productModel.js in productCtrl.js enables the controller to access and manipulate the product data using the defined Mongoose model. */
// index.js -> routes -> controllers -> model -> repository

/* We are using async and await because all these methods are asynchronous and it may take n number of time to fetch the data from the 
data base, so we prefer async and await methods */

// http://localhost:3000/products/page/1/size/5?search=apple&sort=price&direction=desc
// http://localhost:3000/products/page/1/size/10?search=samsung&sort=price&direction=asc
// 2. READ (CRUD)
const get = async(req,res) => {
    try{
        // logger.info('Fetching Products');
        const options = {
            page : req.params.page || 1,
            size : req.params.size || 10,
            // extracts the value of the "search" query parameter from the HTTP request.
            // It is a key-value pair appended to the URL after a question mark (?), for example: ?search=Apple.
            search : req.query.search,
            sort : req.query.sort || 'updatedDate',
            direction : req.query.direction || 'asc', // if the user did not passed the value of direction it'll be in ascending order as default
        }

        const data = await ProductRepo.get(options);

        for(let i = 0; i < data.length; i++){
            if(data[i].image){
                const protocol = req.protocol;
                const domain = req.get('host');
                data[i].image = `${protocol}://${domain}/${data[i].image}`;
            }
        }
        const rows = await ProductRepo.getCount(options.search);
        const pages = Math.ceil(rows / options.size);

        // logger.info('Fetching Products');
        const response = {
            data,
            rows,
            pages,
        } 

        res.status(200);
        res.json(response);
    }catch (err){   
        console.log(err);

        res.status(500);
        res.send('Internal Server Error')
    }
};

// getById
const getById = async(req,res) => {
    const id = req.params.id;
    // findById() function in Mongoose is used to find a single document in a MongoDB collection by its unique identifier (ID).
    const data = await ProductRepo.getById(id);

    if(data.image){
        const protocol = req.protocol;
        const domain = req.get('host');

        data.image = `${protocol}://${domain}/${data.image}`;
    }

    if(!data){
        res.status(500);
        res.send('Internal Server Error');
    }else{
        res.status(200);
        res.json(data);
    }
};

// 1. CREATE (CRUD)
const post = async(req,res) =>{
    try{
        const body = req.body;
        await ProductRepo.create(body);
        // The save() method is a Mongoose function used to save a new document to the MongoDB database.

        res.status(201);
        res.send('Created');
        
    }catch(err){
        console.log(err);
        res.status(500);
        res.send('Internal Server Error');
    }
};

// 4. DELETE (CRUD)
const remove = async(req,res) => {
    try{
        const id = req.params.id;
        await ProductRepo.remove(id);

        res.status(204);
        res.send(); 
    }catch(err){
        res.status(500);
        res.send('Internal Server Error');
    }
};

// 3. UPDATE (CRUD)
const put = async(req,res) => {
    try{
        const id = req.params.id;
        await ProductRepo.put(id, req.body)
         // req.body is used to access the data sent in the body of an HTTP request.
        res.status(204);
        res.send();
    }catch{
        res.status(500);
        res.send('Internal Server Error');
    }
};

// 3. UPDATE (CRUD)
const patch = async(req,res) => {
    try{
        const id = req.params.id;
        // await Product.updateOne({_id: id}, {$set: req.body});
        await ProductRepo.patch(id,{$set: req.body});
        // $set is an operator used to update specific fields in a document without replacing the entire document.
        res.status(204).send();
    }catch{
        res.status(500).send('Internal Server Error');
    }
};

const addReview = async(req,res) => {
    try{
        const productId = req.params.id;
        const payload = req.body;
    
        payload.productId = productId; // we are adding the product id to the payload, the first argument will be id of product
        payload.createdDate = new Date();
    
        await reviewRepo.add(payload);
        res.status(201).send('Created');
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    get,
    getById,
    post,
    remove,
    put,
    patch,
    addReview,
}