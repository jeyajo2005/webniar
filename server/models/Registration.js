import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  webinarId: { type: String, required: true },
  ticketType: { type: String, enum: ['Free', 'VIP'], default: 'Free' },
  amountPaid: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'completed' },
  paymentId: { type: String },
  orderId: { type: String },
  attendanceStatus: { type: String, enum: ['registered', 'attended', 'no-show'], default: 'registered' },
  calendarAdded: { type: Boolean, default: false },
  whatsappNotified: { type: Boolean, default: false },
  emailNotified: { type: Boolean, default: false },
  customAnswers: { type: Map, of: String }
}, { timestamps: true });

let MongooseRegistration;
try {
  MongooseRegistration = mongoose.model('Registration', RegistrationSchema);
} catch (e) {
  MongooseRegistration = mongoose.model('Registration');
}

export const RegistrationModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseRegistration.find(query).sort({ createdAt: -1 });
    }
    return [...memoryStore.registrations].reverse();
  },
  findById: async (id) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseRegistration.findById(id);
    }
    return memoryStore.registrations.find(r => r._id === id) || null;
  },
  findOne: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseRegistration.findOne(query);
    }
    return memoryStore.registrations.find(r => {
      for (const key of Object.keys(query)) {
        if (r[key] !== query[key]) return false;
      }
      return true;
    }) || null;
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseRegistration.create(data);
    }
    const newDoc = {
      _id: 'reg_' + Date.now() + Math.random().toString(36).substring(2, 6),
      ...data,
      createdAt: new Date().toISOString()
    };
    memoryStore.registrations.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseRegistration.findByIdAndUpdate(id, update, { new: true });
    }
    const idx = memoryStore.registrations.findIndex(r => r._id === id);
    if (idx !== -1) {
      memoryStore.registrations[idx] = { ...memoryStore.registrations[idx], ...update };
      return memoryStore.registrations[idx];
    }
    return null;
  },
  countDocuments: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseRegistration.countDocuments(query);
    }
    return memoryStore.registrations.length;
  }
};

export default RegistrationModel;
