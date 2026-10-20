import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { startReminderScheduler } from './jobs/reminderScheduler.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to Database (or initialize resilient memory fallback)
  await connectDB();

  // Start background jobs
  startReminderScheduler();

  app.listen(PORT, () => {
    console.log(`
======================================================
  🚀 WebinarFlow API Server is running!
  📡 Port: http://localhost:${PORT}
  🛠️  Health Check: http://localhost:${PORT}/api/health
  💎 Admin Dashboard API: http://localhost:${PORT}/api/admin/stats
======================================================
    `);
  });
};

startServer();
