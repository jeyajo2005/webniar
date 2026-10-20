import MessageLogModel from '../models/MessageLog.js';
import { whatsappTemplates } from '../utils/templates.js';

export const sendWhatsAppConfirmation = async ({
  phone,
  name,
  webinarTitle = 'Full-Stack AI & Autonomous Agents Masterclass',
  registrationId,
  date = 'November 4, 2026',
  time = '07:00 PM IST',
  webinarLink,
  vipGroupUrl = 'https://chat.whatsapp.com/demoWebinarFlowVip2026',
  invoiceNumber
}) => {
  const messageText = whatsappTemplates.confirmation({
    name,
    webinarTitle,
    registrationId,
    date,
    time,
    vipGroupUrl,
    invoiceNumber,
    webinarLink
  });

  const isEnabled = process.env.WHATSAPP_ENABLED !== 'false';
  let deliveryStatus = 'delivered';

  console.log(`[WhatsApp Service] Dispatched to ${phone}: \n${messageText.substring(0, 120)}...`);

  // Record audit log
  await MessageLogModel.create({
    recipient: phone,
    channel: 'whatsapp',
    templateName: 'WHATSAPP_CONFIRMATION_NOV4',
    status: deliveryStatus,
    payload: {
      phone,
      registrationId,
      invoiceNumber,
      date: 'November 4, 2026',
      sentAt: new Date().toISOString()
    }
  });

  return { success: true, phone, status: deliveryStatus, text: messageText };
};

export const sendWhatsAppReminder = async ({ phone, name, webinarTitle, startsInText, webinarLink }) => {
  const text = whatsappTemplates.reminderNov4({ name, startsInText, webinarLink });

  console.log(`[WhatsApp Reminder] To: ${phone} | Text: ${text.substring(0, 80)}...`);
  await MessageLogModel.create({
    recipient: phone,
    channel: 'whatsapp',
    templateName: 'WHATSAPP_START_REMINDER_NOV4',
    status: 'delivered',
    payload: { phone, startsInText }
  });

  return { success: true, text };
};
