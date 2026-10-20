import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const WebhookEventSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  provider: { type: String, default: 'razorpay' },
  payload: { type: Object, required: true },
  processed: { type: Boolean, default: true },
  error: { type: String }
}, { timestamps: true });

let MongooseWebhookEvent;
try {
  MongooseWebhookEvent = mongoose.model('WebhookEvent', WebhookEventSchema);
} catch (e) {
  MongooseWebhookEvent = mongoose.model('WebhookEvent');
}

export const WebhookEventModel = {
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseWebhookEvent.create(data);
    }
    const newDoc = {
      _id: 'wh_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    memoryStore.webhookEvents.push(newDoc);
    return newDoc;
  },
  find: async () => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseWebhookEvent.find().sort({ createdAt: -1 });
    }
    return memoryStore.webhookEvents;
  }
};

export default WebhookEventModel;
