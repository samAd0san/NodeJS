const Product = require('../models/productModel');

/*Importing productModel.js in productCtrl.js enables the controller to access and manipulate the product data using the defined Mongoose model. */

// 2. READ (CRUD)
const get = (req,res) => {
    Product.find() 
        .then(data => {
            res.status(200);
            res.send();
        })
        .catch(err => {
            res.status(500);
            res.send('Internal Server Error');
        });
    
};

module.exports = {
    get,
}