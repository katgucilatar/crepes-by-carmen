// food item name, description(only show on menu page), price, image, addedToCart(boolean)

const { Schema } = require('mongoose');

// subdocument schema for myOrder array in User model
const orderSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  crepeId: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  addedToCart: {
    type: Boolean,
    required: true
  }
});

module.exports = orderSchema;