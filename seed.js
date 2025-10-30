const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const Rental = require('./models/Rental');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();
    await Rental.deleteMany();

    console.log('Data cleared...');

    // Create admin users
    const admin = await User.create({
      username: 'admin',
      email: 'admin@eventmanagement.com',
      password: 'admin123',
      role: 'admin'
    });

    const yellowmaticsAdmin = await User.create({
      username: 'yellowmatics',
      email: 'admin@yellowmatics.com',
      password: 'yellowmatics123',
      role: 'admin'
    });

    console.log('Admin users created:');
    console.log('  -', admin.email);
    console.log('  -', yellowmaticsAdmin.email);

    // Create sample events
    const events = await Event.create([
      {
        title: 'Summer Music Festival',
        description: 'Join us for an amazing summer music festival featuring local and international artists.',
        location: {
          venue: 'Downtown Conference Center',
          address: '123 Main Street, City Center'
        },
        date: new Date('2025-07-15'),
        category: 'Music',
        capacity: 500,
        isPublished: true,
        createdBy: admin._id
      },
      {
        title: 'Tech Conference 2025',
        description: 'Annual technology conference showcasing the latest innovations and trends.',
        location: {
          venue: 'Skyline Event Space',
          address: '789 Tower Avenue, Business District'
        },
        date: new Date('2025-09-20'),
        category: 'Technology',
        capacity: 200,
        isPublished: true,
        createdBy: admin._id
      },
      {
        title: 'Wedding Expo',
        description: 'Explore everything you need for your perfect wedding day.',
        location: {
          venue: 'Riverside Garden Hall',
          address: '456 River Road, Waterfront District'
        },
        date: new Date('2025-06-10'),
        category: 'Wedding',
        capacity: 300,
        isPublished: true,
        createdBy: admin._id
      }
    ]);

    console.log('Sample events created:', events.length);

    // Create sample rentals
    const rentals = await Rental.create([
      {
        itemName: 'White Folding Chairs',
        description: 'Elegant white folding chairs perfect for any event. Comfortable and stylish.',
        category: 'Furniture',
        pricing: {
          daily: 5,
          weekly: 30
        },
        availability: true,
        quantity: 100,
        createdBy: admin._id
      },
      {
        itemName: 'Round Tables (6ft)',
        description: 'Round tables that seat 8-10 people comfortably.',
        category: 'Furniture',
        pricing: {
          daily: 15,
          weekly: 90
        },
        availability: true,
        quantity: 20,
        createdBy: admin._id
      },
      {
        itemName: 'Sound System Package',
        description: 'Complete sound system with speakers, microphones, and mixing console.',
        category: 'Equipment',
        pricing: {
          hourly: 50,
          daily: 300
        },
        availability: true,
        quantity: 5,
        createdBy: admin._id
      },
      {
        itemName: 'Projector & Screen',
        description: 'HD projector with 100-inch projection screen.',
        category: 'Equipment',
        pricing: {
          hourly: 30,
          daily: 150
        },
        availability: true,
        quantity: 3,
        createdBy: admin._id
      },
      {
        itemName: 'LED String Lights',
        description: 'Beautiful LED string lights to create the perfect ambiance.',
        category: 'Decor',
        pricing: {
          daily: 25,
          weekly: 100
        },
        availability: true,
        quantity: 50,
        createdBy: admin._id
      },
      {
        itemName: 'Table Centerpieces',
        description: 'Elegant floral centerpieces for table decoration.',
        category: 'Decor',
        pricing: {
          daily: 20
        },
        availability: true,
        quantity: 30,
        createdBy: admin._id
      }
    ]);

    console.log('Sample rentals created:', rentals.length);

    console.log('\n=================================');
    console.log('Seed completed successfully!');
    console.log('=================================');
    console.log('\nAdmin Login Credentials:');
    console.log('\n1. Default Admin:');
    console.log('   Email: admin@eventmanagement.com');
    console.log('   Password: admin123');
    console.log('\n2. Yellowmatics Admin:');
    console.log('   Email: admin@yellowmatics.com');
    console.log('   Password: yellowmatics123');
    console.log('=================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
