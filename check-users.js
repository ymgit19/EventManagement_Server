const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB\n');
    
    // Get all users with password field
    const users = await User.find({}).select('+password');
    
    console.log('=== USERS IN DATABASE ===\n');
    if (users.length === 0) {
      console.log('❌ No users found! Run seed.js first.\n');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.role.toUpperCase()}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Username: ${user.username}`);
        console.log(`   Password Hash: ${user.password ? user.password.substring(0, 20) + '...' : 'NONE'}`);
        console.log('');
      });
    }
    
    // Test login for admin@yellowmatics.com
    console.log('=== TESTING YELLOWMATICS ADMIN LOGIN ===\n');
    const adminUser = await User.findOne({ email: 'admin@yellowmatics.com' }).select('+password');
    
    if (adminUser) {
      console.log('✅ User found in database');
      const isMatch = await adminUser.matchPassword('yellowmatics123');
      console.log(`Password test: ${isMatch ? '✅ CORRECT' : '❌ WRONG'}`);
    } else {
      console.log('❌ admin@yellowmatics.com not found in database!');
      console.log('   Run: node seed.js');
    }
    
    console.log('\n=== TESTING DEFAULT ADMIN LOGIN ===\n');
    const defaultAdmin = await User.findOne({ email: 'admin@eventmanagement.com' }).select('+password');
    
    if (defaultAdmin) {
      console.log('✅ User found in database');
      const isMatch = await defaultAdmin.matchPassword('admin123');
      console.log(`Password test: ${isMatch ? '✅ CORRECT' : '❌ WRONG'}`);
    } else {
      console.log('❌ admin@eventmanagement.com not found in database!');
    }
    
    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
