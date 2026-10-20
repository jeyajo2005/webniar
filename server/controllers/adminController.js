import RegistrationModel from '../models/Registration.js';
import PaymentModel from '../models/Payment.js';
import WebinarModel from '../models/Webinar.js';
import MessageLogModel from '../models/MessageLog.js';
import InvoiceModel from '../models/Invoice.js';
import { sendConfirmationEmail, sendReminderEmail } from '../services/emailService.js';
import { sendWhatsAppConfirmation, sendWhatsAppReminder } from '../services/whatsappService.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const registrations = await RegistrationModel.find();
    const payments = await PaymentModel.find();
    const webinars = await WebinarModel.find();
    const messageLogs = await MessageLogModel.find();
    const invoices = await InvoiceModel.find();

    const totalRegistrations = registrations.length;
    const vipRegistrations = registrations.filter(r => r.ticketType === 'VIP' || r.paymentStatus === 'completed').length;
    const freeRegistrations = totalRegistrations - vipRegistrations;

    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const conversionRate = totalRegistrations > 0 ? ((vipRegistrations / totalRegistrations) * 100).toFixed(1) : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalRegistrations,
        vipRegistrations,
        freeRegistrations,
        totalRevenue,
        conversionRate: `${conversionRate}%`,
        activeWebinars: webinars.length,
        totalMessagesSent: messageLogs.length,
        totalInvoices: invoices.length
      },
      registrations: registrations,
      payments: payments,
      messages: messageLogs,
      invoices: invoices,
      webinar: webinars[0] || null
    });
  } catch (error) {
    next(error);
  }
};

export const broadcastReminder = async (req, res, next) => {
  try {
    const { countdownText = '1 Hour' } = req.body;
    const registrations = await RegistrationModel.find();
    const webinar = (await WebinarModel.find())[0];
    const webinarTitle = webinar ? webinar.title : 'Full-Stack AI & Autonomous Agents Masterclass';
    const link = `${process.env.CLIENT_URL || 'http://localhost:5173'}/thank-you`;

    let emailCount = 0;
    let whatsappCount = 0;

    for (const attendee of registrations) {
      if (attendee.email) {
        await sendReminderEmail({
          to: attendee.email,
          name: attendee.name,
          webinarTitle,
          startsInText: countdownText,
          webinarLink: link
        });
        emailCount++;
      }
      if (attendee.phone) {
        await sendWhatsAppReminder({
          phone: attendee.phone,
          name: attendee.name,
          webinarTitle,
          startsInText: countdownText,
          webinarLink: link
        });
        whatsappCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Broadcast sent! Delivered ${emailCount} Emails and ${whatsappCount} WhatsApp alerts.`,
      dispatched: { emailCount, whatsappCount }
    });
  } catch (error) {
    next(error);
  }
};

export const updateWebinarDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await WebinarModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, message: 'Webinar updated successfully', webinar: updated });
  } catch (error) {
    next(error);
  }
};

export const exportRegistrationsCSV = async (req, res, next) => {
  try {
    const registrations = await RegistrationModel.find();
    
    // Build CSV
    const headers = ['Registration ID', 'Name', 'Email', 'Phone', 'Ticket Type', 'Amount Paid (INR)', 'Payment Status', 'Invoice Number', 'Created At'];
    const rows = registrations.map(r => [
      `"${r._id || ''}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${r.ticketType || 'VIP'}"`,
      r.amountPaid || 0,
      `"${r.paymentStatus || 'completed'}"`,
      `"${r.invoiceNumber || ''}"`,
      `"${r.createdAt || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="webinar_registrations_nov4_${Date.now()}.csv"`);
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};

export const resendNotification = async (req, res, next) => {
  try {
    const { registrationId, channel = 'all' } = req.body;
    const reg = await RegistrationModel.findById(registrationId);
    if (!reg) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    const webinar = (await WebinarModel.find())[0];
    const webinarTitle = webinar ? webinar.title : 'Full-Stack AI & Autonomous Agents Masterclass';
    const liveWebinarLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/thankyou?regId=${reg._id}`;
    const invoicePdfUrl = `${process.env.API_URL || 'http://localhost:5000'}/api/invoices/${reg.invoiceNumber || 'INV-2026-0001'}/pdf`;

    let emailSent = false;
    let waSent = false;

    if (channel === 'all' || channel === 'email') {
      await sendConfirmationEmail({
        to: reg.email,
        name: reg.name,
        webinarTitle,
        registrationId: reg._id,
        amountPaid: reg.amountPaid,
        date: 'November 4, 2026',
        time: webinar?.time || '07:00 PM IST',
        timezone: webinar?.timezone || 'IST (UTC+5:30)',
        webinarLink: liveWebinarLink,
        whatsappCommunityUrl: webinar?.whatsappCommunityUrl,
        invoiceNumber: reg.invoiceNumber,
        invoicePdfUrl
      });
      emailSent = true;
    }

    if (channel === 'all' || channel === 'whatsapp') {
      await sendWhatsAppConfirmation({
        phone: reg.phone,
        name: reg.name,
        webinarTitle,
        registrationId: reg._id,
        date: 'November 4, 2026',
        time: webinar?.time || '07:00 PM IST',
        webinarLink: liveWebinarLink,
        vipGroupUrl: webinar?.whatsappCommunityUrl,
        invoiceNumber: reg.invoiceNumber
      });
      waSent = true;
    }

    res.status(200).json({
      success: true,
      message: `Notifications successfully resent (${emailSent ? 'Email ' : ''}${waSent ? 'WhatsApp' : ''})`
    });
  } catch (error) {
    next(error);
  }
};
