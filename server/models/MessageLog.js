import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const MessageLogSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  channel: { type: String, enum: ['email', 'whatsapp', 'sms'], required: true },
  templateName: { type: String, required: true },
  status: { type: String, enum: ['queued', 'sent', 'delivered', 'failed'], default: 'delivered' },
  payload: { type: Object },
  error: { type: String },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

let MongooseMessageLog;
try {
  MongooseMessageLog = mongoose.model('MessageLog', MessageLogSchema);
} catch (e) {
  MongooseMessageLog = mongoose.model('MessageLog');
}

export const MessageLogModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseMessageLog.find(query).sort({ createdAt: -1 });
    }
    return [...memoryStore.messageLogs].reverse();
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseMessageLog.create(data);
    }
    const newDoc = {
      _id: 'msg_' + Date.now(),
      ...data,
      sentAt: new Date().toISOString()
    };
    memoryStore.messageLogs.push(newDoc);
    return newDoc;
  }
};

export default MessageLogModel;
