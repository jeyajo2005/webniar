# LearnFlow Academy & WebinarFlow - Online Learning & Webinar Platform

A professional Udemy and Coursera-style online course platform and high-converting webinar automation system built with the MERN stack (MongoDB, Express, React, Node.js), Tailwind/Vanilla CSS, Razorpay payment processing, and multi-channel notifications.

---

## 🚀 Key Platform Features

### 1. 🎥 Hero Section – Video-Based Learning
- **Full-Screen Realistic Business Class Video**: Features a business webinar trainer presenting on stage (`/videos/gemini_generated_video_323b2790.mp4`).
- **Premium Headline**: *"Upgrade Your Skills. Transform Your Future."*
- **Action Buttons**: *"Explore Courses"* and *"Join Now"*.
- **Comprehensive Controls**: Custom Play/Pause, volume slider with click-to-unmute (browser autoplay compliant), seek progress timeline, and fullscreen toggle.
- **Smooth Transition**: Automatically or manually transitions into the course catalog upon completion or button click.

### 2. 📚 Course Catalog & Landing Page (Udemy / Coursera Style)
- **Top Navigation Bar**: Brand logo, Home, Courses, Live Webinars, Search bar, and dynamic User profile / Login & Signup controls.
- **Category Filter Tabs**: Filter by *All*, *AI & Agents*, *Full-Stack Development*, *Cloud & DevOps*, *UI/UX Design*, *Cyber Security*.
- **Instant Search**: Search through course titles, keywords, and instructor names in real time.
- **Interactive Course Cards**:
  - High-res thumbnails with hover zoom animations.
  - Bestseller, Highest Rated, and Hot & New badges.
  - Title, subtitle, instructor avatar and credentials.
  - Real star ratings (4.9 ★) with reviews and enrolled-student counts.
  - Pricing display (e.g., ₹499 with original ₹2,999 -83% discount).
  - Clear **"View Course"** (opens Details) and **"Enroll Now"** (opens instant Checkout) buttons.
- **Featured Live Webinar Section**: Spotlights the upcoming live masterclass with Dr. Elena Vance (Nov 4, 2026), live seat counter, bonuses, and VIP registration.

### 3. 🔍 Dedicated Course Details Page
- **Course Trailer Player**: Interactive video preview with duration and syllabus overview.
- **Course Meta**: Difficulty level, total hours, lectures count, language, and last updated date.
- **What You'll Learn Grid**: Checkmark grid detailing core learning outcomes.
- **Curriculum Accordion**: Interactive modules with lesson lists, durations, free preview badges, and lock icons for paid content.
- **Instructor Profile**: Detailed credentials, bio, student count, and rating.
- **Floating Purchase Card**: Sticky checkout widget with 30-day guarantee badge, lifetime access indicator, and certificate availability.

### 4. 💳 Complete Payment & Enrollment Flow
- **Order Breakdown**: Itemized course fee, 18% GST tax calculation, promo discount, and net payable amount.
- **Razorpay Payment Integration**:
  - Full support for UPI (Google Pay, PhonePe, Paytm), Cards (Visa, Mastercard, RuPay), and Net Banking.
  - Server-side order generation (`/api/payments/create-course-order`).
  - Server-side HMAC-SHA256 signature verification (`/api/payments/verify-course`).
  - Automated sandbox/test mode simulation for development testing without live API keys.
- **Enrollment & GST Invoice**:
  - Only creates enrollment upon verified signature match.
  - Generates legal GST tax invoice.
  - Sends enrollment confirmation email.
  - Prevents duplicate enrollments or double charging (idempotent).
- **Post-Payment Success Screen**:
  - *"Payment Successful! Welcome to Your Course."*
  - Transaction ID and Invoice Number.
  - Two primary action buttons: **"Start Learning"** (opens classroom) and **"Go to My Courses"** (opens student dashboard).

### 5. 🎓 Student Dashboard ("My Learning")
- **Metrics Bar**: Tracks enrolled courses count, courses in progress, completed courses, and earned certificates.
- **My Courses Tab**: Course cards with real-time percentage progress bars and a **"Continue Learning"** button that resumes from the exact last-accessed lesson.
- **Payment & Invoices Tab**: Complete transaction history with one-click PDF tax invoice downloads.
- **Certificates Tab**: Unlocked upon completing 100% of lessons in an enrolled course. Includes an official printable certificate with unique certificate ID, student name, course title, and instructor signature.
- **Profile Settings Tab**: Manage student name, phone, and bio.

### 6. 💻 Online Course Video Player (Classroom)
- **Distraction-Free Video Classroom**: High-definition video player with speed adjustments (1x, 1.25x, 1.5x, 2x), volume slider, and fullscreen.
- **Curriculum Sidebar**: Collapsible modules and lesson lists showing lesson duration and completion checkmarks.
- **Lesson Navigation**: **"Previous Lesson"** and **"Next Lesson"** navigation buttons.
- **"Mark as Completed" Button**: Instantly updates progress on both client and server, recalculates completion percentage, and issues certificates when 100% is reached.
- **Protected Content**: Server-side enrollment verification (`/api/courses/:id/learn`) ensures non-enrolled students are denied access (HTTP 403).
- **Classroom Tabs**: Overview & Notes, Downloadable GitHub Resource blueprints, and Q&A student discussion forum.

### 7. ⚙️ Organizer Admin Panel
- **Webinar Command Center**: Retains attendee management, live seat counters, broadcast reminders (WhatsApp & Email), and GST invoices.
- **Courses Management Tab**:
  - View all published courses, prices, student enrollments, and ratings.
  - **"+ Create New Course"** modal to publish new courses with custom curriculum, pricing, and video links.
  - Delete or unpublish courses.
  - View all student course enrollments and transaction statuses in real time.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (with in-memory fallback for high resilience).
- **Authentication**: JWT token authentication with bcrypt password hashing.
- **Payments**: Razorpay standard checkout with server-side HMAC signature verification.
- **Invoicing & Email**: PDFKit invoice generator and Nodemailer transactional templates.

---

## 🔑 Quick Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Demo Student** | `student@kaira.io` | `password123` |
| **Demo Admin** | `admin@kaira.io` | `admin123` |
| **Admin Secret Token** | — | `webinar_secret_admin_token_2026` |

---

## 🏃‍♂️ How to Run Locally

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Start Backend Server
```bash
npm run dev:server
# Server runs on http://localhost:5000
```

### 3. Start Frontend Client
```bash
npm run dev:client
# Frontend runs on http://localhost:5173
```

### 4. Run Automated E2E Test Suite
```bash
cd server
node test_lms_e2e.js
```
