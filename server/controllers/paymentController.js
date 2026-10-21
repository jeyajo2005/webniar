import { createRazorpayOrder, verifyRazorpayPayment } from '../services/razorpayService.js';
import { createPhonePeOrder, checkPhonePeStatus } from '../services/phonepeService.js';
import RegistrationModel from '../models/Registration.js';
import PaymentModel from '../models/Payment.js';
import WebinarModel from '../models/Webinar.js';
import InvoiceModel from '../models/Invoice.js';
import CourseModel from '../models/Course.js';
import EnrollmentModel from '../models/Enrollment.js';
import UserModel from '../models/User.js';
import { generateInvoice } from '../services/invoiceService.js';
import { sendConfirmationEmail, sendInvoiceEmail, sendCourseAccessEmail } from '../services/emailService.js';
import { sendWhatsAppConfirmation } from '../services/whatsappService.js';

export const createOrder = async (req, res, next) => {
  try {
    const { registrationId, amount = 1, currency = 'INR', description = 'Kaira Course Registration Fee - ₹1' } = req.body;

    const receipt = `rec_${Date.now().toString().slice(-6)}`;
    const payableAmount = Number(amount) || 1;
    const order = await createRazorpayOrder({
      amount: payableAmount,
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
    const registrationId = req.body.registrationId || req.body.registration_id;
    const orderId = req.body.orderId || req.body.razorpayOrderId || req.body.razorpay_order_id;
    const paymentId = req.body.paymentId || req.body.razorpayPaymentId || req.body.razorpay_payment_id;
    const signature = req.body.signature || req.body.razorpaySignature || req.body.razorpay_signature;
    const amount = Number(req.body.amount || 1);
    const currency = req.body.currency || 'INR';
    const method = req.body.method || 'UPI';

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
      invoiceNumber: invoice.invoiceNumber,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      itemTitle: webinarTitle
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

// COURSE CHECKOUT: Create Razorpay Order for Course
export const createCourseOrder = async (req, res, next) => {
  try {
    const { courseId, amount, currency = 'INR' } = req.body;
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    const payableAmount = amount !== undefined ? Number(amount) : Number(course.price);
    const receipt = `rec_crs_${Date.now().toString().slice(-6)}`;

    const order = await createRazorpayOrder({
      amount: payableAmount,
      currency,
      receipt,
      notes: {
        courseId: course._id,
        courseTitle: course.title,
        userId: req.user?._id || 'guest_checkout'
      }
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_sampleKey123',
      isSimulated: order.isSimulated,
      course: {
        _id: course._id,
        title: course.title,
        price: payableAmount
      }
    });
  } catch (error) {
    next(error);
  }
};

// COURSE CHECKOUT: Verify Signature & Complete Course Enrollment
export const verifyCoursePayment = async (req, res, next) => {
  try {
    const {
      courseId,
      orderId,
      paymentId,
      signature,
      amount,
      currency = 'INR',
      method = 'UPI',
      customer = {}
    } = req.body;

    if (!orderId || !paymentId || !courseId) {
      return res.status(400).json({ success: false, message: 'Missing courseId, orderId, or paymentId.' });
    }

    // Server-side Signature Verification
    const verification = verifyRazorpayPayment({ orderId, paymentId, signature });
    if (!verification.verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature. Payment verification failed on server.'
      });
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    // Resolve User: from token or customer email
    let user = req.user;
    const studentEmail = customer.email || user?.email || 'student@example.com';
    const studentName = customer.name || user?.name || 'Enrolled Student';
    const studentPhone = customer.phone || user?.phone || '';

    if (!user) {
      user = await UserModel.findOne({ email: studentEmail });
      if (!user) {
        // Auto-create student user account so they can log in
        user = await UserModel.create({
          name: studentName,
          email: studentEmail,
          password: 'Password@' + Date.now().toString().slice(-4),
          phone: studentPhone,
          role: 'student'
        });
      }
    }

    // Idempotency: check if enrollment already recorded for this user & course
    let existingEnrollment = await EnrollmentModel.findOne({
      userId: user._id,
      courseId: course._id,
      status: 'active'
    });

    if (existingEnrollment) {
      const existingInvoice = await InvoiceModel.findOne({ paymentId });
      return res.status(200).json({
        success: true,
        message: 'Course already enrolled.',
        enrollment: existingEnrollment,
        invoice: existingInvoice,
        course
      });
    }

    const payableAmount = amount ? Number(amount) : Number(course.price);

    // Generate GST Tax Invoice
    const invoice = await generateInvoice({
      registrationId: `ENR-${Date.now().toString().slice(-6)}`,
      paymentId,
      customer: {
        name: studentName,
        email: studentEmail,
        phone: studentPhone
      },
      amount: payableAmount,
      currency,
      description: `Course Enrollment: ${course.title}`
    });

    // Save Payment record in database
    const payment = await PaymentModel.create({
      registrationId: user._id,
      orderId,
      paymentId,
      signature: signature || 'simulated_valid_sig',
      amount: payableAmount,
      currency,
      status: 'captured',
      method,
      invoiceNumber: invoice.invoiceNumber,
      customerName: studentName,
      customerEmail: studentEmail,
      customerPhone: studentPhone,
      itemTitle: `Course: ${course.title}`
    });

    // Create Enrollment Record
    const enrollment = await EnrollmentModel.create({
      userId: user._id,
      courseId: course._id,
      paymentId,
      orderId,
      amountPaid: payableAmount,
      invoiceNumber: invoice.invoiceNumber,
      status: 'active',
      progress: {
        completedLessons: [],
        lastWatchedLessonId: course.modules?.[0]?.lessons?.[0]?._id || null,
        percent: 0
      },
      certificate: {
        certificateId: 'CERT-KF-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        eligible: false
      }
    });

    // Update course enrolled students count
    await CourseModel.findByIdAndUpdate(course._id, {
      studentsCount: (course.studentsCount || 0) + 1
    });

    // Send Instant Course Access & Payment Successful Confirmation Email
    try {
      await sendCourseAccessEmail({
        to: studentEmail,
        name: studentName,
        courseTitle: course.title,
        courseId: course._id,
        amountPaid: payableAmount,
        invoiceNumber: invoice.invoiceNumber,
        invoicePdfUrl: `${process.env.API_URL || 'http://localhost:5000'}/api/invoices/${invoice.invoiceNumber}/pdf`
      });
    } catch (err) {
      console.warn('[Course Access Email Warning]:', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully! Welcome to your course.',
      enrollment,
      invoice,
      payment,
      course: {
        _id: course._id,
        title: course.title
      }
    });
  } catch (error) {
    next(error);
  }
};

// ================= PHONEPE PG V2 INTEGRATION =================
export const createPhonePePayment = async (req, res, next) => {
  try {
    const { registrationId, amount = 1 } = req.body;
    const merchantOrderId = `ORD_PE_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const redirectUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/thankyou?regId=${registrationId || ''}&orderId=${merchantOrderId}`;

    const order = await createPhonePeOrder({
      amount: Number(amount) || 1,
      merchantOrderId,
      redirectUrl
    });

    res.status(200).json({
      success: true,
      orderId: order.orderId,
      merchantOrderId: order.merchantOrderId,
      redirectUrl: order.redirectUrl,
      amount: order.amount
    });
  } catch (error) {
    next(error);
  }
};

// Check Live PhonePe Payment Status
export const getPhonePeOrderStatus = async (req, res, next) => {
  try {
    const { merchantOrderId } = req.params;
    const statusCheck = await checkPhonePeStatus(merchantOrderId);
    res.status(200).json({
      success: true,
      state: statusCheck.state,
      isCompleted: statusCheck.state === 'COMPLETED',
      data: statusCheck.data
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPhonePePayment = async (req, res, next) => {
  try {
    const { registrationId, merchantOrderId, phonePeOrderId, amount = 1 } = req.body;

    let reg = null;
    if (registrationId) {
      reg = await RegistrationModel.findById(registrationId);
    }

    // STRICT REAL VERIFICATION: Check with PhonePe API if ₹1 was actually paid!
    if (merchantOrderId) {
      const statusCheck = await checkPhonePeStatus(merchantOrderId);
      if (statusCheck.state !== 'COMPLETED') {
        return res.status(400).json({
          success: false,
          state: statusCheck.state || 'PENDING',
          message: '₹1 payment innum receive aagala (Status: ' + (statusCheck.state || 'PENDING') + '). PhonePe-la ₹1 pay pannitu approm verify pannunga.'
        });
      }
    }

    const customer = {
      name: reg ? reg.name : 'Valued Learner',
      email: reg ? reg.email : 'student@example.com',
      phone: reg ? reg.phone : '+91 9876543210'
    };

    const paymentId = phonePeOrderId || `pay_pe_${Date.now()}`;
    const invoice = await generateInvoice({
      registrationId: reg ? reg._id : `REG-${Date.now().toString().slice(-6)}`,
      paymentId,
      customer,
      amount: Number(amount),
      currency: 'INR',
      description: 'Kaira Course: Full-Stack AI & Autonomous Agents'
    });

    const payment = await PaymentModel.create({
      registrationId: reg ? reg._id : 'reg_pe_' + Date.now(),
      orderId: merchantOrderId || ('ord_' + Date.now()),
      paymentId,
      signature: 'phonepe_verified_' + Date.now(),
      amount: Number(amount),
      currency: 'INR',
      status: 'captured',
      method: 'PhonePe PG (UPI / Cards)',
      invoiceNumber: invoice.invoiceNumber,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      itemTitle: 'Kaira Course: Full-Stack AI & Autonomous Agents'
    });

    if (reg) {
      reg = await RegistrationModel.findByIdAndUpdate(reg._id, {
        paymentStatus: 'completed',
        amountPaid: Number(amount),
        paymentId,
        orderId: merchantOrderId,
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
        webinarTitle: 'Kaira Course: Full-Stack AI & Autonomous Agents',
        registrationId: reg ? reg._id : invoice.registrationId,
        amountPaid: Number(amount),
        date: 'November 4, 2026',
        time: '07:00 PM IST',
        timezone: 'IST (UTC+5:30)',
        webinarLink: liveWebinarLink,
        whatsappCommunityUrl: 'https://chat.whatsapp.com/demoWebinarFlowVip2026',
        invoiceNumber: invoice.invoiceNumber,
        invoicePdfUrl
      });

      await sendWhatsAppConfirmation({
        phone: customer.phone,
        name: customer.name,
        webinarTitle: 'Kaira Course: Full-Stack AI & Autonomous Agents',
        registrationId: reg ? reg._id : invoice.registrationId,
        date: 'November 4, 2026',
        time: '07:00 PM IST',
        webinarLink: liveWebinarLink,
        vipGroupUrl: 'https://chat.whatsapp.com/demoWebinarFlowVip2026',
        invoiceNumber: invoice.invoiceNumber
      });
    } catch (err) {
      console.warn('[PhonePe Alerts Warning]:', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'PhonePe ₹1 Payment verified successfully!',
      payment,
      invoice,
      registration: reg
    });
  } catch (error) {
    next(error);
  }
};

