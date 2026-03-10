require('dotenv').config();
const { seedDatabase } = require('../database/seeds/initialData');

console.log('Starting database seeding...');
seedDatabase();
