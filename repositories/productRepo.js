const Product = require('../models/productModel');


// Implementing pagination with search
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

const get = (options) => {
    const {size,currentPage,    sort,search,direction} = options; // property destructure - we are extracting all the attributes of object 'option'
    // and then assigning to the variable name which is mentioned, and both the variable names are same.
    const rowsToSkip = (currentPage - 1) * size;
    const filter = getFilterExp(search);

    // default we'll keep sorting in ascending order
    let sortDir = 1;
    if(direction.toLowerCase() === 'desc') { // if users chooses for descending order
        sortDir = -1; // -1 symbolises for descending order
    }
    
    return Product  
        .find(filter,{__v:0})
        .sort({[sort]: sortDir})
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