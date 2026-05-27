require('dotenv').config();

const { initContactDb } = require('./initContactDb');

async function run() {
  try {
    await initContactDb();
    console.log('MySQL contact database initialized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize MySQL contact database:', error.message);
    process.exit(1);
  }
}

run();
