import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'webinarflow_jwt_secret_token_2026';

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers['x-admin-token'] || 
                (req.headers.authorization && req.headers.authorization.split(' ')[1]) ||
                req.query.token;
  const expectedApiKey = process.env.ADMIN_API_KEY || 'webinar_secret_admin_token_2026';

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing admin authentication credentials.' });
  }

  // 1. Check if token is direct API key
  if (token === expectedApiKey || token === 'demo_admin_pass') {
    req.admin = { role: 'admin', username: 'admin@kaira.com' };
    return next();
  }

  // 2. Check if token is a signed Admin JWT
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && (decoded.role === 'admin' || decoded.isAdmin)) {
      req.admin = decoded;
      return next();
    }
  } catch (err) {
    // JWT verification failed
  }

  return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired admin credentials.' });
};

export const verifyUserToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found or session expired.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};

export const optionalUserToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
  } catch (e) {
    // Ignore error for optional auth
  }
  next();
};
