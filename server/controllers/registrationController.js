import RegistrationModel from '../models/Registration.js';
import WebinarModel from '../models/Webinar.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { sendWhatsAppConfirmation } from '../services/whatsappService.js';

export const registerAttendee = async (req, res, next) => {
  try {
    const { name, email, phone, courseTitle = 'Kaira Professional Course', amount = 1 } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Full name, email address, and phone number are required.' });
    }

    const trimmedName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/[\s-]/g, '');

    if (trimmedName.length < 2) {
      return res.status(400).json({ success: false, message: 'Please enter a valid full name (minimum 2 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (!/^\+?\d{10,13}$/.test(cleanPhone)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number.' });
    }

    const fee = Number(amount) || 1; // Default ₹1

    // Check for existing registration to prevent accidental duplicate registration
    let existing = await RegistrationModel.findOne({ email: cleanEmail });
    if (!existing) {
      existing = await RegistrationModel.findOne({ phone: cleanPhone });
    }

    if (existing) {
      if (existing.paymentStatus === 'completed' || existing.paymentStatus === 'Paid') {
        return res.status(200).json({
          success: true,
          message: 'You have already registered and completed payment for Kaira Course!',
          registration: existing,
          alreadyPaid: true
        });
      }

      // Existing pending registration: return existing record so user can complete payment
      return res.status(200).json({
        success: true,
        message: 'Existing registration found. Proceed to complete your ₹1 payment.',
        registration: existing,
        alreadyRegistered: true
      });
    }

    const registration = await RegistrationModel.create({
      name: trimmedName,
      email: cleanEmail,
      phone: cleanPhone,
      webinarId: 'kaira_course_01',
      ticketType: 'VIP',
      amountPaid: fee,
      paymentStatus: 'pending',
      attendanceStatus: 'registered',
      itemTitle: courseTitle,
      calendarAdded: false,
      whatsappNotified: false,
      emailNotified: false
    });

    res.status(201).json({
      success: true,
      message: 'Registration created successfully. Please complete the ₹1 payment.',
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
