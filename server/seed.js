require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const adminExists = await User.findOne({ email: 'admin@example.com' });
  if (!adminExists) {
    const admin = new User({email: 'admin@example.com', password: 'Admin123!', role: 'admin'});
    await admin.save();
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
  mongoose.disconnect();
}

seed();