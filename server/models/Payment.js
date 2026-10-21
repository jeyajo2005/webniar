import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const PaymentSchema = new mongoose.Schema({
  registrationId: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  signature: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['created', 'authorized', 'captured', 'failed', 'refunded'], default: 'captured' },
  method: { type: String, default: 'UPI' },
  invoiceNumber: { type: String },
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  itemTitle: { type: String }
}, { timestamps: true });

let MongoosePayment;
try {
  MongoosePayment = mongoose.model('Payment', PaymentSchema);
} catch (e) {
  MongoosePayment = mongoose.model('Payment');
}

const matchesQuery = (doc, query) => {
  if (!query || Object.keys(query).length === 0) return true;
  if (query.$or && Array.isArray(query.$or)) {
    return query.$or.some(sub => matchesQuery(doc, sub));
  }
  for (const k of Object.keys(query)) {
    if (k === '$or') continue;
    if (doc[k] !== query[k]) return false;
  }
  return true;
};

export const PaymentModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongoosePayment.find(query).sort({ createdAt: -1 });
    }
    return memoryStore.payments.filter(p => matchesQuery(p, query)).reverse();
  },
  findOne: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongoosePayment.findOne(query);
    }
    return memoryStore.payments.find(p => matchesQuery(p, query)) || null;
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongoosePayment.create(data);
    }
    const newDoc = {
      _id: 'pay_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    memoryStore.payments.push(newDoc);
    return newDoc;
  }
};

export default PaymentModel;
