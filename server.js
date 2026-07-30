require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quantumverse';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// MongoDB Connection
let isMongoConnected = false;
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    isMongoConnected = true;
    console.log('Successfully connected to MongoDB.');
  })
  .catch(err => {
    isMongoConnected = false;
    console.warn('MongoDB connection unavailable. Server operating with local fallback.', err.message);
  });

// Mongoose User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'atom' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  progress: { type: Map, of: Number, default: {} },
  visitedLessons: { type: Map, of: [Number], default: {} },
  achievements: { type: [String], default: [] },
  dailyStreak: { type: Number, default: 0 },
  lastRiddleSolvedDate: { type: String, default: '' }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// API Endpoints

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { user, pass, avatar, xp, level, progress, achievements } = req.body;
    if (!user || !pass) {
      return res.status(400).json({ error: 'Username and passcode are required.' });
    }

    const existingUser = await User.findOne({ username: user });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already registered in the quantum network.' });
    }

    const newUser = new User({
      username: user,
      password: pass,
      avatar: avatar || 'atom',
      xp: xp || 0,
      level: level || 1,
      progress: progress || {},
      achievements: achievements || [],
      visitedLessons: {}
    });

    await newUser.save();

    res.json({
      success: true,
      user: {
        avatar: newUser.avatar,
        xp: newUser.xp,
        level: newUser.level,
        progress: newUser.progress,
        achievements: newUser.achievements
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// Signin Endpoint
app.post('/api/signin', async (req, res) => {
  try {
    const { user, pass } = req.body;
    if (!user || !pass) {
      return res.status(400).json({ error: 'Username and passcode are required.' });
    }

    const dbUser = await User.findOne({ username: user });
    if (dbUser && dbUser.password === pass) {
      res.json({
        success: true,
        user: {
          avatar: dbUser.avatar,
          xp: dbUser.xp,
          level: dbUser.level,
          progress: dbUser.progress,
          achievements: dbUser.achievements,
          dailyStreak: dbUser.dailyStreak || 0,
          lastRiddleSolvedDate: dbUser.lastRiddleSolvedDate || ''
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Internal server error during verification.' });
  }
});

// Load User Stats Endpoint (for page refresh/initial load)
app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const dbUser = await User.findOne({ username });

    if (dbUser) {
      res.json({
        success: true,
        user: {
          avatar: dbUser.avatar,
          xp: dbUser.xp,
          level: dbUser.level,
          progress: dbUser.progress || {},
          achievements: dbUser.achievements || [],
          visitedLessons: dbUser.visitedLessons || {},
          dailyStreak: dbUser.dailyStreak || 0,
          lastRiddleSolvedDate: dbUser.lastRiddleSolvedDate || ''
        }
      });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
    console.error('Fetch user stats error:', err);
    res.status(500).json({ error: 'Internal server error fetching user.' });
  }
});

// Sync / Save Progress Endpoint
app.post('/api/sync', async (req, res) => {
  try {
    const { user, xp, level, progress, achievements, avatar, visitedLessons, dailyStreak, lastRiddleSolvedDate } = req.body;
    if (!user) {
      return res.status(400).json({ error: 'Username is required for sync.' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: user },
      {
        $set: {
          ...(xp !== undefined && { xp }),
          ...(level !== undefined && { level }),
          ...(progress !== undefined && { progress }),
          ...(achievements !== undefined && { achievements }),
          ...(avatar !== undefined && { avatar }),
          ...(visitedLessons !== undefined && { visitedLessons }),
          ...(dailyStreak !== undefined && { dailyStreak }),
          ...(lastRiddleSolvedDate !== undefined && { lastRiddleSolvedDate })
        }
      },
      { new: true }
    );

    if (updatedUser) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
    console.error('Sync progress error:', err);
    res.status(500).json({ error: 'Internal server error syncing data.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`QuantumVerse local server running at http://localhost:${PORT}`);
});
