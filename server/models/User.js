import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { memoryStore } from './store.js';

const UserSchema = new mongoose.Schema({
  _id: { type: String, default: () => 'user_' + Date.now() + Math.random().toString(36).substring(2, 6) },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['student', 'admin', 'instructor'], default: 'student' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
  bio: { type: String, default: 'Passionate learner and tech enthusiast.' }
}, { timestamps: true });

let MongooseUser;
try {
  MongooseUser = mongoose.model('User', UserSchema);
} catch (e) {
  MongooseUser = mongoose.model('User');
}

const matchesQuery = (doc, query) => {
  if (!query || Object.keys(query).length === 0) return true;
  for (const k of Object.keys(query)) {
    if (k === '$or' && Array.isArray(query.$or)) {
      return query.$or.some(sub => matchesQuery(doc, sub));
    }
    if (typeof query[k] === 'string' && typeof doc[k] === 'string') {
      if (doc[k].toLowerCase() !== query[k].toLowerCase()) return false;
    } else if (doc[k] !== query[k]) {
      return false;
    }
  }
  return true;
};

export const UserModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseUser.find(query).select('-password');
    }
    return (memoryStore.users || []).filter(u => matchesQuery(u, query)).map(u => {
      const { password, ...rest } = u;
      return rest;
    });
  },
  findOne: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseUser.findOne(query);
    }
    return (memoryStore.users || []).find(u => matchesQuery(u, query)) || null;
  },
  findById: async (id) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseUser.findOne({ _id: id }).select('-password');
    }
    const user = (memoryStore.users || []).find(u => u._id === id);
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
  },
  create: async (data) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    
    if (mongoose.connection.readyState === 1) {
      return await MongooseUser.create({ ...data, password: hashedPassword });
    }
    const newDoc = {
      _id: 'user_' + Date.now(),
      ...data,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    if (!memoryStore.users) memoryStore.users = [];
    memoryStore.users.push(newDoc);
    return newDoc;
  },
  comparePassword: async (candidatePassword, hash) => {
    return await bcrypt.compare(candidatePassword, hash);
  },
  findByIdAndUpdate: async (id, update) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseUser.findOneAndUpdate({ _id: id }, update, { new: true }).select('-password');
    }
    const index = (memoryStore.users || []).findIndex(u => u._id === id);
    if (index !== -1) {
      memoryStore.users[index] = { ...memoryStore.users[index], ...update };
      const { password, ...rest } = memoryStore.users[index];
      return rest;
    }
    return null;
  }
};

export default UserModel;
