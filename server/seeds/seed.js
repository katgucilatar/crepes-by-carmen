const db = require('../config/connection');
const { User, Order } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const orderData = require('./orderData.json');

db.once('open', async () => {
  // clean database
  await cleanDB("User", "users");
  await cleanDB("Order", "crepes");

  // bulk create each model
  const users = await User.insertMany(userData);
  const crepes = await Order.insertMany(orderData);

  console.log('all done!');
  process.exit(0);
});