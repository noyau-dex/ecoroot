# EcoRoot Backend Integration Guide

## User Schema Structure

### MongoDB User Schema (Mongoose)

```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // Role Management
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  
  // Credit & Score System
  credits: {
    type: Number,
    default: 0,
    min: 0
  },
  score: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Achievement System
  certificates: [{
    type: {
      type: String,
      enum: ['basic', 'advanced', 'expert']
    },
    claimedAt: {
      type: Date,
      default: Date.now
    },
    cost: {
      type: Number,
      required: true
    }
  }],
  
  claimedRewards: [{
    rewardId: {
      type: String,
      required: true
    },
    claimedAt: {
      type: Date,
      default: Date.now
    },
    cost: {
      type: Number,
      required: true
    }
  }],
  
  // Challenge Progress
  completedChallenges: [{
    challengeId: {
      type: String,
      required: true
    },
    proofUrl: String,
    proofType: {
      type: String,
      enum: ['camera', 'upload']
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    verificationId: String,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    dailyProofs: {
      type: Map,
      of: {
        proofUrl: String,
        submittedAt: Date
      }
    },
    progressDays: {
      type: Number,
      default: 0
    },
    lastMarkTime: Date
  }],
  
  // Profile Information
  profile: {
    avatar: String,
    college: String,
    department: String,
    year: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  
  // Activity Tracking
  lastActive: {
    type: Date,
    default: Date.now
  },
  loginCount: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ score: -1 }); // For leaderboard
userSchema.index({ 'completedChallenges.challengeId': 1 });

// Pre-save middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.updatedAt = Date.now();
  next();
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
```

### Challenge Schema

```javascript
// models/Challenge.js
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photoGuidelines: String,
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  durationDays: {
    type: Number,
    required: true,
    min: 1
  },
  image: String,
  requiresProof: {
    type: Boolean,
    default: true
  },
  proofType: {
    type: String,
    enum: ['camera', 'upload'],
    default: 'camera'
  },
  
  // Festival Challenges
  festival: String,
  startDate: Date,
  endDate: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Teacher Challenges
  teacherRole: {
    type: Boolean,
    default: false
  },
  targetAudience: String,
  maxStudents: Number,
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Challenge', challengeSchema);
```

### Reward Schema

```javascript
// models/Reward.js
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  icon: String,
  ngo: String,
  category: {
    type: String,
    enum: ['physical', 'digital', 'experience'],
    default: 'physical'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: -1 // -1 means unlimited
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reward', rewardSchema);
```

## Frontend API Integration

### API Service Setup

```javascript
// src/services/api.js
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Authentication API

```javascript
// src/services/authApi.js
import api from './api';

export const authApi = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/password', passwordData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  }
};
```

### Challenge API

```javascript
// src/services/challengeApi.js
import api from './api';

export const challengeApi = {
  // Get all challenges
  getChallenges: async (userRole = 'student') => {
    const response = await api.get(`/challenges?role=${userRole}`);
    return response.data;
  },

  // Get single challenge
  getChallenge: async (challengeId) => {
    const response = await api.get(`/challenges/${challengeId}`);
    return response.data;
  },

  // Join challenge
  joinChallenge: async (challengeId) => {
    const response = await api.post(`/challenges/${challengeId}/join`);
    return response.data;
  },

  // Submit proof
  submitProof: async (challengeId, formData) => {
    const response = await api.post(`/challenges/${challengeId}/proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Mark day complete
  markDayComplete: async (challengeId, dayNumber) => {
    const response = await api.post(`/challenges/${challengeId}/mark-day`, { dayNumber });
    return response.data;
  },

  // Get user progress
  getUserProgress: async (challengeId) => {
    const response = await api.get(`/challenges/${challengeId}/progress`);
    return response.data;
  },

  // Check verification status
  checkVerificationStatus: async (verificationId) => {
    const response = await api.get(`/verification/${verificationId}`);
    return response.data;
  }
};
```

### Reward API

```javascript
// src/services/rewardApi.js
import api from './api';

export const rewardApi = {
  // Get all rewards
  getRewards: async () => {
    const response = await api.get('/rewards');
    return response.data;
  },

  // Claim certificate
  claimCertificate: async (certificateType) => {
    const response = await api.post('/rewards/certificate', { type: certificateType });
    return response.data;
  },

  // Claim physical reward
  claimReward: async (rewardId) => {
    const response = await api.post('/rewards/claim', { rewardId });
    return response.data;
  },

  // Get user's claimed items
  getUserClaims: async () => {
    const response = await api.get('/rewards/user-claims');
    return response.data;
  }
};
```

### Leaderboard API

```javascript
// src/services/leaderboardApi.js
import api from './api';

export const leaderboardApi = {
  // Get leaderboard
  getLeaderboard: async (limit = 50) => {
    const response = await api.get(`/leaderboard?limit=${limit}`);
    return response.data;
  },

  // Get user rank
  getUserRank: async (userId) => {
    const response = await api.get(`/leaderboard/rank/${userId}`);
    return response.data;
  },

  // Get top performers
  getTopPerformers: async (count = 10) => {
    const response = await api.get(`/leaderboard/top/${count}`);
    return response.data;
  }
};
```

## Backend API Endpoints

### Authentication Routes

```javascript
// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, college, department, year } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate unique ID
    const id = `u${Date.now()}${Math.random().toString(36).slice(2)}`;
    
    // Create user
    const user = new User({
      id,
      name,
      email,
      password,
      role: role || 'student',
      profile: {
        college,
        department,
        year
      }
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update login count and last active
    user.loginCount += 1;
    user.lastActive = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
```

### Challenge Routes

```javascript
// routes/challenges.js
const express = require('express');
const multer = require('multer');
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/proofs/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

// Get challenges based on user role
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.userId });
    const { role } = user;
    
    let challenges;
    if (role === 'teacher') {
      challenges = await Challenge.find().sort({ teacherRole: -1, points: -1 });
    } else {
      challenges = await Challenge.find({ teacherRole: { $ne: true } }).sort({ points: -1 });
    }
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Join challenge
router.post('/:challengeId/join', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.userId });
    const challenge = await Challenge.findOne({ id: req.challengeId });
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if already joined
    const existingProgress = user.completedChallenges.find(c => c.challengeId === challengeId);
    if (existingProgress) {
      return res.status(400).json({ message: 'Already joined this challenge' });
    }

    // Add to user's challenges
    user.completedChallenges.push({
      challengeId: challengeId,
      progressDays: 0,
      verificationStatus: 'pending'
    });

    await user.save();
    res.json({ message: 'Successfully joined challenge' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit proof
router.post('/:challengeId/proof', authenticateToken, upload.single('proof'), async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.userId });
    const challenge = await Challenge.findOne({ id: req.params.challengeId });
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const userChallenge = user.completedChallenges.find(c => c.challengeId === req.params.challengeId);
    if (!userChallenge) {
      return res.status(400).json({ message: 'Not joined this challenge' });
    }

    // Handle file upload
    if (req.file) {
      userChallenge.proofUrl = `/uploads/proofs/${req.file.filename}`;
    }

    // Submit for verification
    const verificationId = `ver_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    userChallenge.verificationId = verificationId;
    userChallenge.verificationStatus = 'pending';

    await user.save();

    // TODO: Add to verification queue for AI processing

    res.json({
      message: 'Proof submitted for verification',
      verificationId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### Reward Routes

```javascript
// routes/rewards.js
const express = require('express');
const User = require('../models/User');
const Reward = require('../models/Reward');
const router = express.Router();

// Get all rewards
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find({ isActive: true });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Claim certificate
router.post('/certificate', authenticateToken, async (req, res) => {
  try {
    const { type } = req.body;
    const user = await User.findOne({ id: req.user.userId });
    
    const certificateCosts = {
      'basic': 1000,
      'advanced': 2000,
      'expert': 3000
    };
    
    const cost = certificateCosts[type];
    if (!cost || user.credits < cost) {
      return res.status(400).json({ message: 'Insufficient credits' });
    }
    
    // Check if already has certificate
    const hasCertificate = user.certificates.some(cert => cert.type === type);
    if (hasCertificate) {
      return res.status(400).json({ message: 'Certificate already claimed' });
    }
    
    // Check certificate order
    const certificateOrder = ['basic', 'advanced', 'expert'];
    const currentIndex = certificateOrder.indexOf(type);
    if (currentIndex > 0) {
      const requiredPreviousCert = certificateOrder[currentIndex - 1];
      const hasPreviousCert = user.certificates.some(cert => cert.type === requiredPreviousCert);
      if (!hasPreviousCert) {
        return res.status(400).json({ 
          message: `You must first earn the ${requiredPreviousCert} certificate` 
        });
      }
    }
    
    // Add certificate and reset credits
    user.certificates.push({
      type,
      cost,
      claimedAt: new Date()
    });
    user.credits = 0;
    
    await user.save();
    
    res.json({
      message: `${type} certificate claimed! Credits reset to 0.`,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Claim physical reward
router.post('/claim', authenticateToken, async (req, res) => {
  try {
    const { rewardId } = req.body;
    const user = await User.findOne({ id: req.user.userId });
    const reward = await Reward.findOne({ id: rewardId });
    
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    
    if (user.credits < reward.cost) {
      return res.status(400).json({ message: 'Insufficient credits' });
    }
    
    // Check if already claimed
    const hasReward = user.claimedRewards.some(r => r.rewardId === rewardId);
    if (hasReward) {
      return res.status(400).json({ message: 'Reward already claimed' });
    }
    
    // Deduct credits and add reward
    user.credits -= reward.cost;
    user.claimedRewards.push({
      rewardId,
      cost: reward.cost,
      claimedAt: new Date()
    });
    
    await user.save();
    
    res.json({
      message: `Reward claimed! ${reward.cost} credits deducted.`,
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

## Environment Variables

```bash
# .env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecoroot
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Package.json Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0",
    "cloudinary": "^1.40.0",
    "nodemailer": "^6.9.4",
    "joi": "^17.9.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## Frontend Integration Steps

1. **Install axios**: `npm install axios`
2. **Replace mockApi.js** with the new API services
3. **Update ChallengesContext** to use real API calls
4. **Add authentication** to all protected routes
5. **Handle loading states** and error messages
6. **Implement file upload** for proof submissions

## Backend Setup Steps

1. **Initialize project**: `npm init -y`
2. **Install dependencies**: `npm install express mongoose bcryptjs jsonwebtoken multer cors helmet express-rate-limit`
3. **Create folder structure**:
   ```
   backend/
   ├── models/
   ├── routes/
   ├── middleware/
   ├── uploads/
   └── server.js
   ```
4. **Set up MongoDB** connection
5. **Configure environment** variables
6. **Implement authentication** middleware
7. **Add file upload** handling
8. **Set up AI verification** service integration

This structure provides a complete backend integration solution for the EcoRoot application!
