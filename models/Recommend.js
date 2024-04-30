const mongoose = require('mongoose');

const recommendSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },
  fromemail: {
    type: String,
    required: true
  },
  toemail: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const recommend = mongoose.model('recommend', recommendSchema);

module.exports= recommend
