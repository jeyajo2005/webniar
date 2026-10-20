// In-Memory Persistent Store fallback when MongoDB isn't running
import { v4 as uuidv4 } from 'uuid';

export const memoryStore = {
  webinars: [
    {
      _id: 'webinar_live_01',
      title: 'Full-Stack AI & Autonomous Agents Masterclass',
      subtitle: 'Build, Deploy & Monetize Production Autonomous AI Agents with Real-Time Streaming & Payments',
      speaker: {
        name: 'Dr. Elena Vance',
        title: 'Principal AI Systems Architect & Founder, AI Innovations Lab',
        avatar: '/assets/female_presenter_blazer.jpg',
        bio: 'Over 12 years of enterprise engineering experience. Former AI Lead, trained 45,000+ engineers worldwide in LLM pipelines, autonomous multi-agent coordination, and scalable cloud monetization.',
        rating: '4.98 / 5.0 (3,800+ reviews)'
      },
      date: 'November 4, 2026',
      time: '07:00 PM IST',
      timezone: 'IST (UTC+5:30)',
      duration: '180 Minutes (Live Interactive Class + Live Q&A)',
      price: 499,
      vipPrice: 499,
      originalPrice: 2999,
      currency: 'INR',
      maxSeats: 500,
      seatsBooked: 462,
      videoPreviewUrl: '/assets/female_presenter_blazer.jpg',
      webinarAccessLink: 'https://live.webinarflow.io/room/ai-masterclass-nov4',
      whatsappCommunityUrl: 'https://chat.whatsapp.com/demoWebinarFlowVip2026',
      status: 'active',
      tags: ['Autonomous Agents', 'Tool Calling', 'Razorpay Payments', 'Live Masterclass', 'GST Invoicing'],
      companySettings: {
        businessName: 'WebinarFlow Automation Pvt. Ltd.',
        address: 'Tech Innovation Tower, Cyber City, Bangalore, KA 560100',
        contactEmail: 'support@webinarflow.io',
        contactPhone: '+91 80 4920 1200',
        gstin: '29AABCU9603R1ZM',
        taxRate: 0.18,
        invoicePrefix: 'INV-2026'
      },
      bonuses: [
        { title: 'Production Multi-Agent SaaS Starter Repo (GitHub)', value: '₹4,999', icon: 'Code' },
        { title: '100+ Enterprise System Prompts & Tool Calling Blueprints', value: '₹2,499', icon: 'Sparkles' },
        { title: 'Official VIP WhatsApp Mastermind & Networking Group', value: '₹1,999', icon: 'MessageCircle' },
        { title: 'Authorized Certificate of Completion & CPD Credit', value: '₹1,499', icon: 'Award' }
      ],
      agenda: [
        { time: '07:00 PM', topic: 'Architecture of Production Autonomous Agent Swarms', desc: 'Understanding LLM tool calling, multi-agent arbitration, memory stores, and zero-shot reasoning.' },
        { time: '07:45 PM', topic: 'Live Coding: Full-Stack React + Streaming AI Backend', desc: 'Constructing token-streaming UI, dynamic agent delegation, and fast asynchronous execution pipelines.' },
        { time: '08:30 PM', topic: 'Monetization Engine: Razorpay Checkout & Automated GST Invoices', desc: 'Implementing webhook handlers, idempotency checks, PDF invoices, and automated WhatsApp/email triggers.' },
        { time: '09:15 PM', topic: 'Grand Live Mastermind, Deployment & Hot-Seat Q&A', desc: 'Live cloud publishing, attendee architecture evaluations, and 1-on-1 career direction with Dr. Elena Vance.' }
      ],
      testimonials: [
        {
          name: 'Vikramaditya Sengupta',
          role: 'Staff Engineer at Razorpay',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          quote: 'Dr. Elena Vance breaks down complex multi-agent swarms into clean, production-ready code. The Razorpay monetization workflow alone saved our team weeks of development.',
          rating: 5
        },
        {
          name: 'Meera Nambiar',
          role: 'Lead Architect at CloudScale',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
          quote: 'The automation funnel is mind-blowing. Immediate WhatsApp confirmation, instant GST invoice download, and clear calendar synchronization made this the smoothest webinar experience ever.',
          rating: 5
        },
        {
          name: 'David Anderson',
          role: 'AI Product Specialist, Global Tech',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          quote: 'The live class presentation format is unmatched. Elena teaches what actually matters in 2026: autonomous agent resilience, security, and profitable billing.',
          rating: 5
        }
      ],
      faqs: [
        {
          question: 'When is the actual webinar class taking place?',
          answer: 'The live masterclass takes place on November 4, 2026 at 07:00 PM IST. If you register today, your seat is reserved immediately, and you will receive instant confirmation via email and WhatsApp with your unique registration ID and tax invoice.'
        },
        {
          question: 'Will I get the recorded session if I cannot attend live on Nov 4, 2026?',
          answer: 'Yes! All confirmed VIP registrants receive lifetime access to the full 4K recorded masterclass, presentation slides, and complete GitHub repository.'
        },
        {
          question: 'How do I receive my tax invoice and receipt?',
          answer: 'Immediately upon verified payment, your official GST-compliant tax invoice is generated with a unique invoice number. You can download the PDF right on the Thank You page and it will also be sent to your registered email.'
        },
        {
          question: 'How do I join the WhatsApp Mastermind community?',
          answer: 'After payment verification, you will see a prominent "Join WhatsApp Community" button on your Thank You page, and our automation service will also dispatch the secure invitation link directly to your WhatsApp number.'
        },
        {
          question: 'How will I join the live class on November 4, 2026?',
          answer: 'You will receive secure joining links and calendar invitations via email and WhatsApp. We also trigger automated reminder alerts (24h before, 1h before, and when the class goes live) so you never miss a minute.'
        }
      ]
    }
  ],
  registrations: [
    {
      _id: 'reg_demo_101',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      phone: '+919876543210',
      webinarId: 'webinar_live_01',
      ticketType: 'VIP',
      amountPaid: 499,
      paymentStatus: 'completed',
      paymentId: 'pay_demo_test_9981',
      orderId: 'order_demo_12345',
      invoiceNumber: 'INV-2026-0001',
      attendanceStatus: 'registered',
      calendarAdded: true,
      whatsappNotified: true,
      emailNotified: true,
      createdAt: '2026-10-18T10:30:00.000Z'
    },
    {
      _id: 'reg_demo_102',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+919812345678',
      webinarId: 'webinar_live_01',
      ticketType: 'VIP',
      amountPaid: 499,
      paymentStatus: 'completed',
      paymentId: 'pay_demo_test_9982',
      orderId: 'order_demo_12346',
      invoiceNumber: 'INV-2026-0002',
      attendanceStatus: 'registered',
      calendarAdded: true,
      whatsappNotified: true,
      emailNotified: true,
      createdAt: '2026-10-19T14:15:00.000Z'
    }
  ],
  payments: [
    {
      _id: 'pay_record_001',
      registrationId: 'reg_demo_101',
      orderId: 'order_demo_12345',
      paymentId: 'pay_demo_test_9981',
      signature: 'simulated_valid_sig',
      amount: 499,
      currency: 'INR',
      status: 'captured',
      method: 'UPI',
      invoiceNumber: 'INV-2026-0001',
      createdAt: '2026-10-18T10:30:00.000Z'
    },
    {
      _id: 'pay_record_002',
      registrationId: 'reg_demo_102',
      orderId: 'order_demo_12346',
      paymentId: 'pay_demo_test_9982',
      signature: 'simulated_valid_sig',
      amount: 499,
      currency: 'INR',
      status: 'captured',
      method: 'CARD',
      invoiceNumber: 'INV-2026-0002',
      createdAt: '2026-10-19T14:15:00.000Z'
    }
  ],
  invoices: [
    {
      _id: 'inv_record_001',
      invoiceNumber: 'INV-2026-0001',
      registrationId: 'reg_demo_101',
      paymentId: 'pay_demo_test_9981',
      customer: {
        name: 'Rohan Sharma',
        email: 'rohan.sharma@example.com',
        phone: '+919876543210'
      },
      items: [
        { description: 'Full-Stack AI & Autonomous Agents Masterclass (Nov 4, 2026)', amount: 499 }
      ],
      subtotal: 422.88,
      tax: 76.12,
      total: 499.00,
      currency: 'INR',
      status: 'paid',
      pdfUrl: '/api/invoices/INV-2026-0001/pdf',
      downloadUrl: '/api/invoices/INV-2026-0001/download',
      createdAt: '2026-10-18T10:30:00.000Z'
    },
    {
      _id: 'inv_record_002',
      invoiceNumber: 'INV-2026-0002',
      registrationId: 'reg_demo_102',
      paymentId: 'pay_demo_test_9982',
      customer: {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        phone: '+919812345678'
      },
      items: [
        { description: 'Full-Stack AI & Autonomous Agents Masterclass (Nov 4, 2026)', amount: 499 }
      ],
      subtotal: 422.88,
      tax: 76.12,
      total: 499.00,
      currency: 'INR',
      status: 'paid',
      pdfUrl: '/api/invoices/INV-2026-0002/pdf',
      downloadUrl: '/api/invoices/INV-2026-0002/download',
      createdAt: '2026-10-19T14:15:00.000Z'
    }
  ],
  messageLogs: [
    {
      _id: 'msg_001',
      recipient: 'rohan.sharma@example.com',
      channel: 'email',
      templateName: 'REGISTRATION_CONFIRMATION_NOV4',
      status: 'delivered',
      sentAt: '2026-10-18T10:30:05.000Z'
    },
    {
      _id: 'msg_002',
      recipient: '+919876543210',
      channel: 'whatsapp',
      templateName: 'WHATSAPP_CONFIRMATION_NOV4',
      status: 'delivered',
      sentAt: '2026-10-18T10:30:06.000Z'
    }
  ],
  webhookEvents: []
};
