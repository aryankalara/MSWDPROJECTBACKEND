const mongoose = require("mongoose")

const customerschema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female']
    },
    dateofbirth: {
      type: String,
      required: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
      },
    location: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
      },
    
  });

const customer = mongoose.model('customer', customerschema);

module.exports = customer;