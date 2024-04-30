const mongoose = require('mongoose');

const productcartSchema = new mongoose.Schema({
    purchaseId: {
        type: String,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    productid: {
        type: Number,
        required: true
    },
    customeremail: {
        type: String,
        required: true
    },
    addtocartStatus: {
        type: String,
        required: true,
        default: "notaddedtocart"
    },    
});

const ProductCart = mongoose.model('ProductCart', productcartSchema);

function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "C" + randomNumber;
}

module.exports = ProductCart;