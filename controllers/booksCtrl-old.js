// handler function (It is a call back function)
const books = (req,res) => {
    const books = [{id:1,name:'Atomic Habits',price:499},{id:2,name:'xDman',price:349}];
    // Serialiazation
    res.json(books);
}

const authors = (req,res) => {
    const authors = ['James Bond','Karl rock'];
    res.json(authors);
}

module.exports = {
    // we can declare like this
    books : books,

    // or like this
    authors,
};