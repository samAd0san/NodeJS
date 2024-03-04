const Product = require('../models/productModel');

// Implementing pagination
const get = (currentPage,size) => {
    // currentPage - The current page which you are at.
    /* size - The Page in which total number of rows(product) can fit. eg if total rows(products) are 11
    and sizeOfPage is 5 i.e only max 5 rows can pe displayed per page.*/

    // Also, the total number of pages will be 3.

    const rows = 4;
    const rowsToSkip = (currentPage - 1) * size;

    return Product  
        .find({},{_v:0})
        .skip(rowsToSkip)
        .limit(size);
}

const getCount = () => {
    return Product.countDocuments();
}

const getById = (id) => {
    return Product.findById(id, {_v:0});
}

const create = (body) => {
    const product = new Product(body);
    return product.save();
}

const remove = (id) => {
    return Product.deleteOne({_id: id});
}

const put = (id,playload) => {
    return Product.updateOne({ _id:id }, playload);
}

const patch = (id, playload) => {
    return Product.updateOne({_id:id},playload);
}

module.exports = {
    get,
    getById,
    create,
    remove,
    put,
    patch,
    getCount,
}