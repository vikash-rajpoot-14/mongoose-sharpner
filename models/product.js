const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type:Number,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type:String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;
