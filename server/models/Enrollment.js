import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const EnrollmentSchema = new mongoose.Schema({
  _id: { type: String, default: () => 'enr_' + Date.now() + Math.random().toString(36).substring(2, 6) },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  paymentId: { type: String, required: true },
  orderId: { type: String },
  amountPaid: { type: Number, required: true },
  invoiceNumber: { type: String },
  status: { type: String, enum: ['active', 'completed', 'refunded'], default: 'active' },
  progress: {
    completedLessons: [{ type: String }],
    lastWatchedLessonId: { type: String },
    percent: { type: Number, default: 0 }
  },
  certificate: {
    certificateId: { type: String },
    issuedAt: { type: String },
    eligible: { type: Boolean, default: false }
  },
  enrolledAt: { type: Date, default: Date.now }
}, { timestamps: true });

let MongooseEnrollment;
try {
  MongooseEnrollment = mongoose.model('Enrollment', EnrollmentSchema);
} catch (e) {
  MongooseEnrollment = mongoose.model('Enrollment');
}

const matchesQuery = (doc, query) => {
  if (!query || Object.keys(query).length === 0) return true;
  for (const k of Object.keys(query)) {
    if (k === '$or' && Array.isArray(query.$or)) {
      return query.$or.some(sub => matchesQuery(doc, sub));
    }
    if (doc[k] !== query[k]) return false;
  }
  return true;
};

export const EnrollmentModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseEnrollment.find(query).sort({ enrolledAt: -1 });
    }
    return (memoryStore.enrollments || []).filter(e => matchesQuery(e, query));
  },
  findOne: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseEnrollment.findOne(query);
    }
    return (memoryStore.enrollments || []).find(e => matchesQuery(e, query)) || null;
  },
  findById: async (id) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseEnrollment.findOne({ _id: id });
    }
    return (memoryStore.enrollments || []).find(e => e._id === id) || null;
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseEnrollment.create(data);
    }
    const newDoc = {
      _id: 'enr_' + Date.now(),
      ...data,
      progress: data.progress || { completedLessons: [], lastWatchedLessonId: null, percent: 0 },
      certificate: data.certificate || { eligible: false },
      enrolledAt: new Date().toISOString()
    };
    if (!memoryStore.enrollments) memoryStore.enrollments = [];
    memoryStore.enrollments.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseEnrollment.findOneAndUpdate({ _id: id }, update, { new: true });
    }
    const index = (memoryStore.enrollments || []).findIndex(e => e._id === id);
    if (index !== -1) {
      memoryStore.enrollments[index] = { ...memoryStore.enrollments[index], ...update };
      return memoryStore.enrollments[index];
    }
    return null;
  }
};

export default EnrollmentModel;
