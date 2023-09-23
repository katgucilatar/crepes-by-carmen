const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');

db.once('open', async () => {
  // clean database
  await cleanDB('User', 'userSchema');

  // bulk create each model
  await User.insertMany(userData);

  console.log('all done!');
  process.exit(0);
});