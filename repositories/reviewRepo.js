const Review = require('../models/reviewModel');

const add = (review) => {
    const data = new Review(review);
    data.save();
};

module.exports = {
    add,
};