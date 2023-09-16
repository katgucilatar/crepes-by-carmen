// address line 1, address line 2, city, state, zip code, delivery instructions, delivery time

const { Schema } = require('mongoose');

// subdocument schema for myOrder array in User model
const deliverySchema = new Schema({
  deliveryId: {
    type: String,
    required: true,
  },
  addressLineOne: {
    type: String,
    required: true,
  },
  addressLineTwo: {
    type: String
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true
  },
  deliveryInstructions: {
    type: String
  },
  deliveryTime: {
    type: String
  }
});

module.exports = deliverySchema;