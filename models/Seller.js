const mongoose = require("mongoose")

const sellerschema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
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
    companyname: {
        type: String,
        required: true
      },
    location: {
      type: String,
      required: true 
    },
    password: {
        type: String,
        required: true,
        default:"klef1234"
      },
    
  });

const seller = mongoose.model('seller', sellerschema);

module.exports = seller;