const Review = require('../models/reviewModel');

const add = (review) => {
    const data = new Review(review);
    data.save();
};

const get = (productId) => {
    return Review.find({productId : productId},{ __v : 0, _id : 0});
}

module.exports = {
    add,
    get,
};