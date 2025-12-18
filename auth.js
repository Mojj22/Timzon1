const jwt = require('jsonwebtoken');
const { getUserById } = require('../utils/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const user = getUserById(req.user.userId);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };

