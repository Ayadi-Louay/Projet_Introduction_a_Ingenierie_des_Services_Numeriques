const mongoose = require('mongoose');
const User = require('../../src/models/User');
const HealthAlert = require('../../src/models/HealthAlert');
require('dotenv').config();

// Initial data for database seeding
const initialData = {
  users: [
    {
      firstName: 'Admin',
      lastName: 'Salemty',
      email: 'admin@salemty.tn',
      password: 'admin123456',
      role: 'admin',
      isVerified: true
    },
    {
      firstName: 'Health',
      lastName: 'Worker',
      email: 'health@salemty.tn',
      password: 'health123456',
      role: 'health_worker',
      isVerified: true
    },
    {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@salemty.tn',
      password: 'test123456',
      role: 'user',
      isVerified: true
    }
  ],
  
  healthAlerts: [
    {
      title: 'Grippe saisonnière - Tunis',
      description: 'Augmentation significative des cas de grippe signalés dans la région de Tunis. Prenez des précautions supplémentaires et consultez un médecin en cas de symptômes.',
      disease: 'grippe',
      severity: 'high',
      affectedAreas: ['Tunis', 'Ariana', 'Manouba'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      isActive: true
    },
    {
      title: 'Gastro-entérite - Sousse',
      description: 'Pic de cas de gastro-entérite signalés dans la région de Sousse. Hygiène alimentaire renforcée recommandée.',
      disease: 'gastro-enterite',
      severity: 'medium',
      affectedAreas: ['Sousse', 'Monastir', 'Mahdia'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      isActive: true
    },
    {
      title: 'Allergie saisonnière',
      description: 'Période de pollens élevée dans plusieurs régions. Personnes allergiques doivent prendre leurs traitements préventifs.',
      disease: 'allergie',
      severity: 'low',
      affectedAreas: ['Sfax', 'Gabès', 'Medenine'],
      startDate: new Date(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      isActive: true
    }
  ]
};

// Seed database with initial data
const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database for seeding');

    // Clear existing data
    await User.deleteMany({});
    await HealthAlert.deleteMany({});
    console.log('Cleared existing data');

    // Create initial users
    const createdUsers = await User.create(initialData.users);
    console.log(`Created ${createdUsers.length} users`);

    // Create initial health alerts
    const adminUser = createdUsers.find(u => u.role === 'admin');
    const alertsToCreate = initialData.healthAlerts.map(alert => ({
      ...alert,
      createdBy: adminUser._id
    }));
    
    const createdAlerts = await HealthAlert.create(alertsToCreate);
    console.log(`Created ${createdAlerts.length} health alerts`);

    console.log('Database seeded successfully!');
    
    // Display created credentials
    console.log('\n=== CREATED USERS ===');
    createdUsers.forEach(user => {
      console.log(`${user.role.toUpperCase()}: ${user.email} / password`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, initialData };
