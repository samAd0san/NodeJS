const Product = require('../models/productModel');

const get = () => {
    return Product.find({}, {_v: 0});
};

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
}