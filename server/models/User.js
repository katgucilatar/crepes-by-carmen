// email, name, password, orderSchema, deliverySchema

const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const orderSchema = require('./Order');
const deliverySchema = require('./Delivery');

const userSchema = new Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
    name: {
    type: String,
    required: true,
    trim: true,
  },
    password: {
    type: String,
    required: true,
    minlength: 5,
  },
  myOrder: [orderSchema],
  deliveryInfo: [deliverySchema]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;