const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
  productId :[{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  }],
 quantity : {
  type : Number,
 }
});

const CartItem = mongoose.model('CartItem',CartItemSchema);

module.exports = CartItem;
