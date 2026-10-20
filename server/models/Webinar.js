import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const WebinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  speaker: {
    name: { type: String, required: true },
    title: { type: String },
    avatar: { type: String },
    bio: { type: String },
    rating: { type: String }
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, default: '120 Minutes' },
  price: { type: Number, default: 0 },
  vipPrice: { type: Number, default: 499 },
  currency: { type: String, default: 'INR' },
  maxSeats: { type: Number, default: 500 },
  seatsBooked: { type: Number, default: 0 },
  videoPreviewUrl: { type: String },
  status: { type: String, enum: ['draft', 'active', 'completed'], default: 'active' },
  bonuses: [{ title: String, value: String, icon: String }],
  agenda: [{ time: String, topic: String, desc: String }]
}, { timestamps: true });

let MongooseWebinar;
try {
  MongooseWebinar = mongoose.model('Webinar', WebinarSchema);
} catch (e) {
  MongooseWebinar = mongoose.model('Webinar');
}

// Resilient DAO that transparently uses MongoDB when connected or memoryStore fallback
export const WebinarModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseWebinar.find(query);
    }
    return memoryStore.webinars;
  },
  findOne: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseWebinar.findOne(query);
    }
    return memoryStore.webinars[0] || null;
  },
  findById: async (id) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseWebinar.findById(id);
    }
    return memoryStore.webinars.find(w => w._id === id) || memoryStore.webinars[0] || null;
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseWebinar.create(data);
    }
    const newDoc = { _id: 'webinar_' + Date.now(), ...data, createdAt: new Date().toISOString() };
    memoryStore.webinars.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseWebinar.findByIdAndUpdate(id, update, { new: true });
    }
    const index = memoryStore.webinars.findIndex(w => w._id === id);
    if (index !== -1) {
      memoryStore.webinars[index] = { ...memoryStore.webinars[index], ...update };
      return memoryStore.webinars[index];
    }
    return null;
  }
};

export default WebinarModel;
