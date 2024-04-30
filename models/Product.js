const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    productid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    companyname: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prevprice: {
        type: Number,
        required: true,
    },
    newprice: {
        type: Number,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    file: {
        type: String, //URL
        required: true,
      },
      comparisionlink1: {
        type: String, //URL
        required: true,
      },
      comparisionlink2: {
        type:String,
        required: true,
      },

    

});

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

const product = mongoose.model('Product', productschema);

module.exports = product;