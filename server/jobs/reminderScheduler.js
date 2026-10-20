import cron from 'node-cron';
import RegistrationModel from '../models/Registration.js';
import WebinarModel from '../models/Webinar.js';
import { sendReminderEmail } from '../services/emailService.js';
import { sendWhatsAppReminder } from '../services/whatsappService.js';

export const startReminderScheduler = () => {
  console.log('[Scheduler] Webinar reminder cron engine initialized (Scheduled for November 4, 2026).');

  // Check every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    try {
      const now = new Date();
      const currentMonth = now.getMonth(); // 10 is November (0-indexed)
      const currentDay = now.getDate();

      console.log(`[Scheduler] Scanning reminders at ${now.toLocaleTimeString()}...`);
      
      const registrations = await RegistrationModel.find();
      const webinar = (await WebinarModel.find())[0];
      const webinarTitle = webinar ? webinar.title : 'Full-Stack AI & Autonomous Agents Masterclass';
      const liveLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/thankyou`;

      // Auto-trigger on November 4
      if (currentDay === 4 && currentMonth === 10) {
        console.log('[Scheduler Alert] November 4 Class Day detected! Checking live alert dispatches...');
        for (const reg of registrations) {
          if (!reg.classStartedAlertSent && reg.paymentStatus === 'completed') {
            await sendWhatsAppReminder({
              phone: reg.phone,
              name: reg.name,
              webinarTitle,
              startsInText: '10 Minutes',
              webinarLink: liveLink
            });
            await sendReminderEmail({
              to: reg.email,
              name: reg.name,
              webinarTitle,
              startsInText: '10 Minutes',
              webinarLink: liveLink
            });
            await RegistrationModel.findByIdAndUpdate(reg._id, { classStartedAlertSent: true });
          }
        }
      }
    } catch (e) {
      console.error('[Scheduler Error]:', e.message);
    }
  });
};
