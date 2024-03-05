const Product = require('../models/productModel');


// Implementing pagination with search
// http://localhost:3000/products/page/1/size/5?search=apple
const getFilterExp = (search) => { 
    // This function is used for searching product with either brand (Apple) or model (iphone 13 pro)
    // The RegExp() method creates a regular expression object for matching patterns in strings.
    return {
        $or: [
            {brand: new RegExp(search,'i')},
            {model: new RegExp(search,'i')}
        ]
    };
};

const getCount = (search) => { // while the count in every page should reflect regarding the no of rows present in that particular page
    const filter = getFilterExp(search);
    return Product.countDocuments(filter);
};

const get = (currentPage,size,search) => {
    const rowsToSkip = (currentPage - 1) * size;
    const filter = getFilterExp(search);
    
    return Product  
    .find(filter,{_v:0})
    .skip(rowsToSkip)
    .limit(size);
};

const getById = (id) => {
    return Product.findById(id, {_v:0});
};

const create = (body) => {
    const product = new Product(body);
    return product.save();
};

const remove = (id) => {
    return Product.deleteOne({_id: id});
};

const put = (id,playload) => {
    return Product.updateOne({ _id:id }, playload);
};

const patch = (id, playload) => {
    return Product.updateOne({_id:id},playload);
};

module.exports = {
    get,
    getById,
    create,
    remove,
    put,
    patch,
    getCount,
};