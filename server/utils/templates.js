// Email and WhatsApp Communication Templates for WebinarFlow

export const emailTemplates = {
  confirmation: ({
    name,
    webinarTitle = 'Full-Stack AI & Autonomous Agents Masterclass',
    registrationId,
    amountPaid = 499,
    date = 'November 4, 2026',
    time = '07:00 PM IST',
    timezone = 'IST (UTC+5:30)',
    webinarLink,
    calendarUrl,
    whatsappCommunityUrl = 'https://chat.whatsapp.com/demoWebinarFlowVip2026',
    invoiceNumber,
    invoicePdfUrl
  }) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Webinar Registration Confirmed – November 4, 2026</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%); padding: 36px 32px; text-align: center; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #fff; margin-bottom: 12px; }
        .title { color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; line-height: 1.3; }
        .body { padding: 32px; }
        .greeting { font-size: 18px; font-weight: 600; color: #f8fafc; margin-bottom: 14px; }
        .alert-box { background: rgba(245, 158, 11, 0.12); border-left: 4px solid #f59e0b; padding: 14px 16px; border-radius: 8px; margin: 20px 0; font-size: 14px; color: #fef3c7; line-height: 1.5; }
        .info-grid { background: #0f172a; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #334155; }
        .info-item { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid #1e293b; padding-bottom: 8px; }
        .info-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .info-label { color: #94a3b8; }
        .info-val { color: #f8fafc; font-weight: 600; }
        .cta-btn { display: block; background: #4f46e5; color: #ffffff !important; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; text-align: center; margin: 16px 0; }
        .wa-btn { display: block; background: #16a34a; color: #ffffff !important; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; text-align: center; margin: 16px 0; }
        .inv-btn { display: block; background: #334155; color: #e2e8f0 !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-align: center; margin: 12px 0; }
        .footer { text-align: center; padding: 24px 32px; color: #64748b; font-size: 12px; border-top: 1px solid #334155; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="badge">Registration Confirmed • Class: November 4, 2026</div>
          <h1 class="title">${webinarTitle}</h1>
        </div>
        <div class="body">
          <p class="greeting">Hello ${name},</p>
          <p style="color: #cbd5e1; line-height: 1.6;">
            Your webinar registration has been successfully confirmed and your seat is reserved!
          </p>

          <div class="alert-box">
            <strong>📅 Important Class Date Notice:</strong><br>
            Please note that your live masterclass is scheduled for <strong>November 4, 2026</strong> at <strong>${time} (${timezone})</strong>. Even if you registered prior to this date, your live interactive session takes place on November 4!
          </div>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">👤 Participant:</span>
              <span class="info-val">${name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">🆔 Registration ID:</span>
              <span class="info-val"><code>${registrationId || 'REG-2026-VIP'}</code></span>
            </div>
            <div class="info-item">
              <span class="info-label">💳 Payment Status:</span>
              <span class="info-val" style="color: #22c55e;">Confirmed (₹${amountPaid})</span>
            </div>
            <div class="info-item">
              <span class="info-label">📅 Webinar Class Date:</span>
              <span class="info-val" style="color: #60a5fa;">November 4, 2026</span>
            </div>
            <div class="info-item">
              <span class="info-label">⏰ Webinar Time:</span>
              <span class="info-val">${time} (${timezone})</span>
            </div>
            ${invoiceNumber ? `
            <div class="info-item">
              <span class="info-label">📄 Official Tax Invoice:</span>
              <span class="info-val">${invoiceNumber}</span>
            </div>
            ` : ''}
          </div>

          <h3 style="color: #f8fafc; margin-top: 24px; font-size: 16px;">Next Action Steps:</h3>
          
          <a href="${whatsappCommunityUrl}" class="wa-btn">
            💬 Join Official WhatsApp Community
          </a>

          ${invoicePdfUrl ? `
          <a href="${invoicePdfUrl}" class="inv-btn">
            📄 Download Official Tax Invoice (PDF)
          </a>
          ` : ''}

          <div style="background: #0f172a; padding: 18px; border-radius: 8px; margin: 20px 0; border: 1px solid #334155;">
            <strong style="color: #f8fafc; font-size: 14px;">Webinar Joining Instructions:</strong>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin-top: 8px;">
              1. Your personal room joining link is secured and will be activated before 07:00 PM IST on November 4, 2026.<br>
              2. You will receive automated WhatsApp & email reminders 24 hours before, 1 hour before, and when the class goes live.<br>
              3. You can also re-access your confirmation portal at any time here:
            </p>
            <a href="${webinarLink}" style="color: #818cf8; font-size: 13px; word-break: break-all;">${webinarLink}</a>
          </div>

          ${calendarUrl ? `
          <div style="text-align: center; margin-top: 16px;">
            <a href="${calendarUrl}" style="color: #94a3b8; text-decoration: none; font-size: 13px;">📅 Add November 4, 2026 to Calendar</a>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          WebinarFlow Automation Engine • Class Date: November 4, 2026<br>
          Automated confirmation sent securely to ${name}.
        </div>
      </div>
    </body>
    </html>
  `,

  reminder: ({ name, webinarTitle, startsInText, webinarLink }) => `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"></head>
    <body style="background: #0f172a; color: #e2e8f0; font-family: sans-serif; padding: 24px;">
      <div style="max-width: 540px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 28px; border: 1px solid #334155;">
        <span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 12px;">🚨 STARTS IN ${startsInText.toUpperCase()}</span>
        <h2 style="color: white; margin-top: 16px;">${webinarTitle} starts in ${startsInText}!</h2>
        <p style="color: #94a3b8; line-height: 1.6;">
          Hey ${name}, this is your reminder for the live masterclass scheduled for <strong>November 4, 2026</strong>. Dr. Elena Vance is preparing to kick off the session!
        </p>
        <a href="${webinarLink}" style="display: block; background: #4f46e5; color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">
          Join Live Webinar Room Now &rarr;
        </a>
      </div>
    </body>
    </html>
  `,

  invoice: ({ invoiceNumber, name, total, date, downloadUrl }) => `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"></head>
    <body style="background: #0f172a; color: #e2e8f0; font-family: sans-serif; padding: 24px;">
      <div style="max-width: 540px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 28px; border: 1px solid #334155;">
        <h2 style="color: white; margin: 0 0 12px;">Tax Invoice Receipt (${invoiceNumber})</h2>
        <p style="color: #94a3b8; line-height: 1.6;">
          Hello ${name}, thank you for registering for the <strong>Full-Stack AI & Autonomous Agents Masterclass</strong> on November 4, 2026.
        </p>
        <p style="color: #94a3b8;">Total Paid: <strong>₹${total}</strong> (Status: PAID & VERIFIED)</p>
        <a href="${downloadUrl}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px;">
          Download Tax Invoice PDF
        </a>
      </div>
    </body>
    </html>
  `,

  courseAccess: ({
    name,
    courseTitle,
    amountPaid = 499,
    courseLink,
    invoiceNumber,
    invoicePdfUrl
  }) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Payment Successful – Start Studying on Kaira</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #06b6d4 100%); padding: 36px 32px; text-align: center; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #fff; margin-bottom: 12px; }
        .title { color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; line-height: 1.3; }
        .body { padding: 32px; }
        .greeting { font-size: 18px; font-weight: 600; color: #f8fafc; margin-bottom: 14px; }
        .success-box { background: rgba(34, 197, 94, 0.12); border-left: 4px solid #22c55e; padding: 14px 16px; border-radius: 8px; margin: 20px 0; font-size: 14px; color: #bbf7d0; line-height: 1.6; }
        .info-grid { background: #0f172a; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #334155; }
        .info-item { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid #1e293b; padding-bottom: 8px; }
        .info-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .info-label { color: #94a3b8; }
        .info-val { color: #f8fafc; font-weight: 600; }
        .cta-btn { display: block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 16px 28px; border-radius: 10px; font-weight: 800; font-size: 16px; text-align: center; margin: 20px 0; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); }
        .inv-btn { display: block; background: #334155; color: #e2e8f0 !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-align: center; margin: 12px 0; }
        .footer { text-align: center; padding: 24px 32px; color: #64748b; font-size: 12px; border-top: 1px solid #334155; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="badge">Payment Successful • Course Unlocked</div>
          <h1 class="title">${courseTitle}</h1>
        </div>
        <div class="body">
          <p class="greeting">Hello ${name},</p>
          
          <div class="success-box">
            <strong>🎉 Payment Received Successfully!</strong><br>
            Your enrollment is confirmed. All video lectures, source codes, and curriculum tests are now fully unlocked for your account. You can begin studying immediately!
          </div>

          <a href="${courseLink}" class="cta-btn">
            🚀 Start Studying Course Now &rarr;
          </a>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">👤 Student:</span>
              <span class="info-val">${name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">📚 Enrolled Course:</span>
              <span class="info-val">${courseTitle}</span>
            </div>
            <div class="info-item">
              <span class="info-label">💳 Amount Paid:</span>
              <span class="info-val" style="color: #22c55e;">₹${amountPaid} (Verified)</span>
            </div>
            <div class="info-item">
              <span class="info-label">♾️ Access Level:</span>
              <span class="info-val" style="color: #60a5fa;">Lifetime 24/7 Access</span>
            </div>
            <div class="info-item">
              <span class="info-label">🏆 Certificate:</span>
              <span class="info-val">Verifiable ISO Certificate Included</span>
            </div>
            ${invoiceNumber ? `
            <div class="info-item">
              <span class="info-label">📄 GST Tax Invoice:</span>
              <span class="info-val">${invoiceNumber}</span>
            </div>
            ` : ''}
          </div>

          <h3 style="color: #f8fafc; margin-top: 24px; font-size: 15px;">How to Access & Study Your Course:</h3>
          <ol style="color: #cbd5e1; font-size: 13px; line-height: 1.7; padding-left: 20px;">
            <li>Click the <strong>Start Studying Course Now</strong> button above.</li>
            <li>Stream any video lesson at full 1080p HD, with adjustable playback speeds (0.75x – 2x).</li>
            <li>Download project repository templates, notes, and cheat sheets in the classroom tab.</li>
            <li>Complete the final module assessment to claim and share your verified certificate on LinkedIn.</li>
          </ol>

          ${invoicePdfUrl ? `
          <a href="${invoicePdfUrl}" class="inv-btn">
            📄 Download Official Tax Invoice Receipt (PDF)
          </a>
          ` : ''}
        </div>

        <div class="footer">
          Kaira Learning Platform • Empowering Careers Worldwide<br>
          Automated confirmation sent securely to ${name}.
        </div>
      </div>
    </body>
    </html>
  `
};

export const whatsappTemplates = {
  confirmation: ({
    name,
    webinarTitle = 'Full-Stack AI & Autonomous Agents Masterclass',
    registrationId,
    date = 'November 4, 2026',
    time = '07:00 PM IST',
    vipGroupUrl = 'https://chat.whatsapp.com/demoWebinarFlowVip2026',
    invoiceNumber,
    webinarLink
  }) =>
`🎉 *Webinar Registration Confirmed!*

Hello ${name}, your registration for *${webinarTitle}* has been verified and confirmed!

🆔 *Registration ID:* ${registrationId || 'REG-2026-CONFIRMED'}
💳 *Payment Status:* Verified & Completed
📅 *Webinar Class Date:* *November 4, 2026*
⏰ *Class Time:* ${time}
${invoiceNumber ? `📄 *Invoice Number:* ${invoiceNumber}\n` : ''}
⚠️ *Important Note:* The live interactive masterclass takes place on *November 4, 2026*. Please mark your calendar!

👥 *Next Step - Join Our Official WhatsApp Community:*
👉 ${vipGroupUrl}

🔗 *Your Confirmation & Room Portal:*
${webinarLink || 'http://localhost:5173/thankyou'}

We look forward to seeing you live on November 4, 2026!`,

  reminderNov4: ({ name, startsInText = '1 Hour', webinarLink, passcode = 'AI-LIVE-2026' }) =>
`🚨 *REMINDER: Masterclass on November 4, 2026 Starts in ${startsInText}!*

Hey ${name}, we are getting ready to go live! Dr. Elena Vance is setting up the Autonomous Agent demo.

⏰ *Starts in:* ${startsInText}
🔑 *Access Passcode:* ${passcode}
🔗 *Live Room:* ${webinarLink || 'http://localhost:5173/thankyou'}

Grab your notes and jump in early!`
};
