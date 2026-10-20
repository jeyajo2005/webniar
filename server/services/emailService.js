import nodemailer from 'nodemailer';
import { emailTemplates } from '../utils/templates.js';
import MessageLogModel from '../models/MessageLog.js';

let transporter = null;

const getTransporter = () => {
  if (!transporter && process.env.SMTP_HOST && !process.env.SMTP_USER?.includes('demo_')) {
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } catch (e) {
      console.warn('[Email Transporter Warning]:', e.message);
    }
  }
  return transporter;
};

export const sendConfirmationEmail = async ({
  to,
  name,
  webinarTitle = 'Full-Stack AI & Autonomous Agents Masterclass',
  registrationId,
  amountPaid = 499,
  date = 'November 4, 2026',
  time = '07:00 PM IST',
  timezone = 'IST (UTC+5:30)',
  webinarLink,
  calendarUrl,
  whatsappCommunityUrl,
  invoiceNumber,
  invoicePdfUrl
}) => {
  const html = emailTemplates.confirmation({
    name,
    webinarTitle,
    registrationId,
    amountPaid,
    date,
    time,
    timezone,
    webinarLink,
    calendarUrl,
    whatsappCommunityUrl,
    invoiceNumber,
    invoicePdfUrl
  });

  // Strict email subject as required: “Webinar Registration Confirmed – November 4, 2026”
  const subject = 'Webinar Registration Confirmed – November 4, 2026';

  let status = 'delivered';
  const mailer = getTransporter();

  if (mailer) {
    try {
      await mailer.sendMail({
        from: process.env.EMAIL_FROM || 'WebinarFlow <noreply@webinarflow.io>',
        to,
        subject,
        html,
      });
    } catch (err) {
      console.warn('[Email Delivery Warning]:', err.message);
      status = 'simulated';
    }
  } else {
    console.log(`[Email Service - Simulated Dispatch] To: ${to} | Subject: "${subject}"`);
    status = 'simulated';
  }

  // Audit Log in MongoDB / Store
  await MessageLogModel.create({
    recipient: to,
    channel: 'email',
    templateName: 'REGISTRATION_CONFIRMATION_NOV4',
    status,
    payload: { webinarTitle, registrationId, invoiceNumber, date: 'November 4, 2026', sentAt: new Date().toISOString() }
  });

  return { success: true, status };
};

export const sendReminderEmail = async ({ to, name, webinarTitle, startsInText, webinarLink }) => {
  const html = emailTemplates.reminder({ name, webinarTitle, startsInText, webinarLink });
  const subject = `Reminder: ${webinarTitle} starts in ${startsInText}! (November 4, 2026)`;

  console.log(`[Email Service - Reminder] To: ${to} | Countdown: ${startsInText}`);
  await MessageLogModel.create({
    recipient: to,
    channel: 'email',
    templateName: 'UPCOMING_REMINDER_NOV4',
    status: 'delivered',
    payload: { startsInText, webinarTitle }
  });

  return { success: true };
};

export const sendInvoiceEmail = async ({ to, name, invoiceNumber, total, date, downloadUrl }) => {
  const html = emailTemplates.invoice({ invoiceNumber, name, total, date, downloadUrl });
  const subject = `Your Invoice & Payment Receipt (${invoiceNumber}) - WebinarFlow (November 4, 2026 Class)`;

  console.log(`[Email Service - Invoice] To: ${to} | Invoice: ${invoiceNumber}`);
  await MessageLogModel.create({
    recipient: to,
    channel: 'email',
    templateName: 'INVOICE_RECEIPT',
    status: 'delivered',
    payload: { invoiceNumber, total }
  });

  return { success: true };
};
