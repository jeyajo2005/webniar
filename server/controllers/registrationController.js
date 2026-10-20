import RegistrationModel from '../models/Registration.js';
import WebinarModel from '../models/Webinar.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { sendWhatsAppConfirmation } from '../services/whatsappService.js';

export const registerAttendee = async (req, res, next) => {
  try {
    const { name, email, phone, webinarId, ticketType = 'VIP', amount } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone number are required.' });
    }

    // Find active webinar
    const webinar = (await WebinarModel.find())[0];
    const fee = amount || (webinar ? webinar.vipPrice : 499);

    // Check for existing registration
    let existing = await RegistrationModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Existing registration found.',
        registration: existing,
        alreadyRegistered: true
      });
    }

    const registration = await RegistrationModel.create({
      name,
      email: email.toLowerCase(),
      phone,
      webinarId: webinarId || 'webinar_live_01',
      ticketType: 'VIP',
      amountPaid: fee,
      paymentStatus: 'pending',
      attendanceStatus: 'registered',
      calendarAdded: false,
      whatsappNotified: false,
      emailNotified: false
    });

    // Update seat count
    if (webinar && webinar._id) {
      await WebinarModel.findByIdAndUpdate(webinar._id, {
        seatsBooked: (webinar.seatsBooked || 0) + 1
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration initialized successfully.',
      registration
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const registration = await RegistrationModel.findById(id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }
    const webinar = await WebinarModel.findById(registration.webinarId);
    res.status(200).json({ success: true, registration, webinar });
  } catch (error) {
    next(error);
  }
};

export const getAllRegistrations = async (req, res, next) => {
  try {
    const { search } = req.query;
    let list = await RegistrationModel.find();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.includes(q)
      );
    }

    res.status(200).json({
      success: true,
      count: list.length,
      registrations: list
    });
  } catch (error) {
    next(error);
  }
};

export const simulateDripMessage = async (req, res, next) => {
  try {
    const { phone = '+919876543210', name = 'Attendee', step = 'nov4_started' } = req.body;
    res.status(200).json({
      success: true,
      step,
      messageSent: `Alert dispatched for ${name} (${phone}) for November 4, 2026 class`,
      deliveryStatus: 'delivered',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
