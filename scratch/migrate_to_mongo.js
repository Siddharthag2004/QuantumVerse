require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DB_PATH = path.join(__dirname, '..', 'data', 'database.json');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quantumverse';

// User Schema matching server.js
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'atom' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  progress: { type: Map, of: Number, default: {} },
  visitedLessons: { type: Map, of: [Number], default: {} },
  achievements: { type: [String], default: [] }
});

const User = mongoose.model('User', UserSchema);

async function runMigration() {
  try {
    console.log('Reading local data/database.json...');
    if (!fs.existsSync(DB_PATH)) {
      console.log('No local database.json found. Skipping migration.');
      process.exit(0);
    }

    const data = fs.readFileSync(DB_PATH, 'utf8');
    const localDB = JSON.parse(data || '{}');
    const users = Object.keys(localDB);

    if (users.length === 0) {
      console.log('Local database is empty. No user records to migrate.');
      process.exit(0);
    }

    console.log(`Found ${users.length} user(s) to migrate.`);
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB.');

    for (const username of users) {
      const u = localDB[username];
      console.log(`Migrating user: ${username}...`);

      // Check if user already exists
      const exists = await User.findOne({ username });
      if (exists) {
        console.log(`User ${username} already exists in MongoDB. Skipping.`);
        continue;
      }

      const newUser = new User({
        username,
        password: u.password,
        avatar: u.avatar || 'atom',
        xp: u.xp || 0,
        level: u.level || 1,
        progress: u.progress || {},
        visitedLessons: u.visitedLessons || {},
        achievements: u.achievements || []
      });

      await newUser.save();
      console.log(`Successfully migrated user: ${username}`);
    }

    console.log('Migration complete. Disconnecting...');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
