const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
    rate : Number,
    count : Number
})
const productSchema = new mongoose.Schema({
    title : {
        type: String,
        minlength: [10, "Sorry, you cannot enter value less than 10"],
        required: true,
        unique: true,
        trim: true
    },
    price : {
        type: Number,
        min: [1, "Sorry, you cannot enter price less than 1"],
        required: true,
        trim: true
    },
    description : {
        type: String,
        minlength: 25,
        required: true,
        trim: true
    },
    category : {
        type: String,
        minlength: 5,
        required: true,
        trim: true
    },
    image : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    rating : ratingSchema
})

const ProductModel = new mongoose.model('Product', productSchema);

module.exports = ProductModel;
