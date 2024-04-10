/*When dealing with databases in a Node.js application, it's a common practice to use models to encapsulate the interaction with the database.
 Models abstract the database operations and provide a structured way to perform CRUD (Create, Read, Update, Delete) operations on your data. */

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: String,
    model: String,
    price: Number,
    inStock: Boolean,
    discount: Number,
    image: String,
    createdDate: Date,
    updateDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('product',schema);