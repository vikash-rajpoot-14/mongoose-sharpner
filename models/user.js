const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        ProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function (product) {
  const productCartIndex = this.cart.items.findIndex(item => {
    return item.ProductId.toString() === product._id.toString()
  });
  let updatedCartItem = [...this.cart.items];
  let newQuantity = 1
  if (productCartIndex >= 0) {
    newQuantity = this.cart.items[productCartIndex].quantity + 1;
    updatedCartItem[productCartIndex].quantity = newQuantity;
  } else {
    updatedCartItem.push({
      ProductId: product._id,
      quantity: newQuantity
    })
  }
  let updatedCart = {
    items: updatedCartItem
  }
  this.cart = updatedCart;
  // console.log(this);
  return this.save()
}

userSchema.methods.removerItemFromCart = function (prodId) {
  const productCartItems = this.cart.items.filter((product) =>{
   return product._id.toString() !== prodId.toString();
  });
  let updatedCart = {
    items: productCartItems
  }
  this.cart = updatedCart;
  return this.save()
}

userSchema.methods.clearCart = function(){
   this.cart.items = [];
   return this.save()
}
const User = mongoose.model('User', userSchema)

module.exports = User;
