# WebinarFlow - High-Converting Webinar Sales Funnel & Automation Platform

WebinarFlow is a production-grade, end-to-end webinar funnel and automation platform built with React, Node.js, Express, MongoDB (with in-memory fallback), Razorpay payment processing, and multi-channel notification services (WhatsApp & Email).

## Architecture & Features

### 🌟 Client (React + Modern Vanilla CSS System)
- **High-Converting Landing Page (`LandingPage.jsx`)**:
  - Hero section with live countdown timer, social proof counter ("847+ booked, 53 spots remaining").
  - Value proposition banners, bonus breakdown ($1,499 value free), audience targeted modules.
- **Interactive Video Preview (`PromoVideo.jsx`)**:
  - Realistic custom-styled video teaser with playback simulation, chapter scrubber, speed controls, audio toggle.
- **Curriculum & Speaker Credibility (`WebinarDetails.jsx`)**:
  - Masterclass agenda breakdown, speaker pedigree & social validation, FAQ interactive accordion.
- **Frictionless Registration (`RegistrationForm.jsx`)**:
  - Free & VIP pass tier switcher, live instant validation, country code selector, discount voucher support.
- **Payment Gateway (`PaymentButton.jsx`)**:
  - Razorpay standard checkout integration with instant simulated fallback mode for instant sandbox testing.
- **Order Bump & Checkout (`CheckoutPage.jsx`)**:
  - Secure 256-bit checkout with 1-click VIP recording upsell / bump offer, multi-currency display (₹ INR & $ USD).
- **Post-Registration Portal (`ThankYouPage.jsx`)**:
  - 1-Click Google Calendar & Apple/Outlook iCal (.ics) export.
  - VIP WhatsApp group invite gateway.
  - Downloadable printable ticket and tax invoice preview.
- **Organizer Command Center (`AdminDashboard.jsx`)**:
  - Live revenue, ticket conversion, and attendee stats.
  - Registration database with live search, filtering, and CSV export.
  - Broadcast reminder triggers (Email + WhatsApp) with real-time audit logs.

### ⚙️ Server (Node.js + Express API)
- **Config & Resilient DB (`config/db.js`)**: Connects to MongoDB, or gracefully operates in reliable in-memory persistent cache if MongoDB is not locally running.
- **Models (`models/`)**: `Webinar`, `Registration`, `Payment`, `Invoice`, `MessageLog`, `WebhookEvent`.
- **Controllers & Routes (`controllers/` & `routes/`)**: Complete REST APIs for registrations, Razorpay order creation and signature verification, invoices, admin stats.
- **Automations & Services (`services/`)**:
  - `razorpayService.js`: Razorpay SDK + mock development signature generator.
  - `emailService.js`: Nodemailer HTML transactional emails for confirmations, tickets & reminders.
  - `whatsappService.js`: Cloud API / Twilio formatted template dispatcher.
  - `invoiceService.js`: Automated GST-compliant invoice generation with line items and numbers.
  - `communityService.js`: Dynamic VIP community invite generator (WhatsApp / Discord).
- **Scheduled Background Jobs (`jobs/reminderScheduler.js`)**: Cron job checking webinars and triggering 24h, 1h, and 15m notification pipelines.

---

## Quick Start

### 1. Install Dependencies
```bash
# In the webinarflow directory:
npm run install:all
```

Or install in both folders separately:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment Variables
Copy `server/.env.example` to `server/.env` (default working test keys are pre-configured).

### 3. Start Development Servers
Run the backend:
```bash
cd server
npm run dev
```

In another terminal, run the frontend:
```bash
cd client
npm run dev
```

Visit the app at `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend API).
