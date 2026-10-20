import { createRazorpayOrder, verifyRazorpayPayment } from '../services/razorpayService.js';
import RegistrationModel from '../models/Registration.js';
import PaymentModel from '../models/Payment.js';
import WebinarModel from '../models/Webinar.js';
import InvoiceModel from '../models/Invoice.js';
import { generateInvoice } from '../services/invoiceService.js';
import { sendConfirmationEmail, sendInvoiceEmail } from '../services/emailService.js';
import { sendWhatsAppConfirmation } from '../services/whatsappService.js';

export const createOrder = async (req, res, next) => {
  try {
    const { registrationId, amount = 499, currency = 'INR', description = 'VIP Masterclass Access' } = req.body;

    const receipt = `rec_${Date.now().toString().slice(-6)}`;
    const order = await createRazorpayOrder({
      amount: Number(amount),
      currency,
      receipt,
      notes: {
        registrationId: registrationId || 'direct_checkout',
        description
      }
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_sampleKey123',
      isSimulated: order.isSimulated
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const {
      registrationId,
      orderId,
      paymentId,
      signature,
      amount = 499,
      currency = 'INR',
      method = 'UPI'
    } = req.body;

    if (!orderId || !paymentId) {
      return res.status(400).json({ success: false, message: 'Missing orderId or paymentId.' });
    }

    // Server-side Signature Verification
    const verification = verifyRazorpayPayment({ orderId, paymentId, signature });
    if (!verification.verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature. Payment verification failed on server.'
      });
    }

    // Idempotency check: Check if payment is already recorded
    let existingPayment = await PaymentModel.findOne({
      $or: [{ paymentId }, { orderId }]
    });

    let reg = null;
    if (registrationId) {
      reg = await RegistrationModel.findById(registrationId);
    }

    const webinar = (await WebinarModel.find())[0];
    const webinarTitle = webinar ? webinar.title : 'Full-Stack AI & Autonomous Agents Masterclass';
    const date = 'November 4, 2026';
    const time = webinar ? webinar.time : '07:00 PM IST';
    const timezone = webinar?.timezone || 'IST (UTC+5:30)';
    const whatsappCommunityUrl = webinar?.whatsappCommunityUrl || 'https://chat.whatsapp.com/demoWebinarFlowVip2026';

    const customer = {
      name: reg ? reg.name : 'VIP Attendee',
      email: reg ? reg.email : 'attendee@example.com',
      phone: reg ? reg.phone : '+919999999999'
    };

    // If payment already verified, return existing invoice and prevent duplicate generation
    if (existingPayment) {
      const existingInvoice = await InvoiceModel.findOne({
        $or: [{ paymentId }, { registrationId }]
      });

      return res.status(200).json({
        success: true,
        message: 'Payment already verified and processed.',
        payment: existingPayment,
        invoice: existingInvoice,
        registration: reg
      });
    }

    // Generate Single Unique Invoice
    const invoice = await generateInvoice({
      registrationId: reg ? reg._id : `REG-${Date.now().toString().slice(-6)}`,
      paymentId,
      customer,
      amount,
      currency,
      description: 'Full-Stack AI & Autonomous Agents Masterclass (November 4, 2026)'
    });

    // Save payment record in MongoDB / store
    const payment = await PaymentModel.create({
      registrationId: reg ? reg._id : 'reg_guest_' + Date.now(),
      orderId,
      paymentId,
      signature: signature || 'simulated_sig',
      amount: Number(amount),
      currency,
      status: 'captured',
      method,
      invoiceNumber: invoice.invoiceNumber
    });

    // Update Registration to verified PAID status
    if (reg) {
      reg = await RegistrationModel.findByIdAndUpdate(reg._id, {
        ticketType: 'VIP',
        amountPaid: Number(amount),
        paymentStatus: 'completed',
        paymentId,
        orderId,
        invoiceNumber: invoice.invoiceNumber,
        emailNotified: true,
        whatsappNotified: true
      });
    }

    const liveWebinarLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/thankyou?regId=${reg ? reg._id : ''}`;
    const invoicePdfUrl = `${process.env.API_URL || 'http://localhost:5000'}/api/invoices/${invoice.invoiceNumber}/pdf`;

    // Automated Notifications dispatch
    try {
      await sendConfirmationEmail({
        to: customer.email,
        name: customer.name,
        webinarTitle,
        registrationId: reg ? reg._id : invoice.registrationId,
        amountPaid: amount,
        date,
        time,
        timezone,
        webinarLink: liveWebinarLink,
        whatsappCommunityUrl,
        invoiceNumber: invoice.invoiceNumber,
        invoicePdfUrl
      });

      await sendWhatsAppConfirmation({
        phone: customer.phone,
        name: customer.name,
        webinarTitle,
        registrationId: reg ? reg._id : invoice.registrationId,
        date,
        time,
        webinarLink: liveWebinarLink,
        vipGroupUrl: whatsappCommunityUrl,
        invoiceNumber: invoice.invoiceNumber
      });
    } catch (err) {
      console.warn('[Post-Payment Alerts Warning]:', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully and official registration confirmed!',
      payment,
      invoice,
      registration: reg
    });
  } catch (error) {
    next(error);
  }
};
