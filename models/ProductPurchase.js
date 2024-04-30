const mongoose = require('mongoose');

const productpurchaseSchema = new mongoose.Schema({
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
    count: {
        type: Number,
        required: true,
        default:0
    },
    purchaseStatus: {
        type: String,
        required: true,
        default: "notpurchased"
    },
});

const ProductPurchase = mongoose.model('Productpurchase', productpurchaseSchema);

function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "P" + randomNumber;
}

module.exports = ProductPurchase;