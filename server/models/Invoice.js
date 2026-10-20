import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  registrationId: { type: String, required: true },
  paymentId: { type: String },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  items: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['paid', 'pending', 'void'], default: 'paid' },
  pdfUrl: { type: String },
  downloadUrl: { type: String }
}, { timestamps: true });

let MongooseInvoice;
try {
  MongooseInvoice = mongoose.model('Invoice', InvoiceSchema);
} catch (e) {
  MongooseInvoice = mongoose.model('Invoice');
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

export const InvoiceModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseInvoice.find(query).sort({ createdAt: -1 });
    }
    return memoryStore.invoices.filter(inv => matchesQuery(inv, query)).reverse();
  },
  findOne: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseInvoice.findOne(query);
    }
    return memoryStore.invoices.find(inv => matchesQuery(inv, query)) || null;
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseInvoice.create(data);
    }
    const newDoc = {
      _id: 'inv_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    memoryStore.invoices.push(newDoc);
    return newDoc;
  }
};

export default InvoiceModel;
