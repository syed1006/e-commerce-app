const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    count:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model('products', productSchema);
module.exports = Product;