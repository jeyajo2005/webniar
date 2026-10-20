import InvoiceModel from '../models/Invoice.js';
import WebinarModel from '../models/Webinar.js';
import PDFDocument from 'pdfkit';

/**
 * Generate GST-compliant invoice record
 */
export const generateInvoice = async ({ registrationId, customer, amount, currency = 'INR', description, paymentId }) => {
  // Check if invoice already exists for this registrationId or paymentId (prevent duplicate invoices)
  const existing = await InvoiceModel.findOne({
    $or: [
      { registrationId: registrationId },
      ...(paymentId ? [{ paymentId }] : [])
    ]
  });

  if (existing) {
    return existing;
  }

  const webinar = (await WebinarModel.find())[0];
  const company = (webinar && webinar.companySettings) || {
    businessName: 'WebinarFlow Automation Pvt. Ltd.',
    address: 'Tech Innovation Tower, Cyber City, Bangalore, KA 560100',
    contactEmail: 'support@webinarflow.io',
    contactPhone: '+91 80 4920 1200',
    gstin: '29AABCU9603R1ZM',
    taxRate: 0.18,
    invoicePrefix: 'INV-2026'
  };

  const count = (await InvoiceModel.find()).length + 1;
  const prefix = company.invoicePrefix || 'INV-2026';
  const invoiceNumber = `${prefix}-${String(count).padStart(4, '0')}`;

  const taxRate = company.taxRate || 0.18; // 18% standard GST
  const subtotal = Math.round((Number(amount) / (1 + taxRate)) * 100) / 100;
  const tax = Math.round((Number(amount) - subtotal) * 100) / 100;

  const invoice = await InvoiceModel.create({
    invoiceNumber,
    registrationId,
    paymentId,
    customer,
    items: [
      {
        description: description || 'Full-Stack AI & Autonomous Agents Masterclass (November 4, 2026)',
        amount: Number(amount)
      }
    ],
    subtotal,
    tax,
    total: Number(amount),
    currency,
    status: 'paid',
    pdfUrl: `/api/invoices/${invoiceNumber}/pdf`,
    downloadUrl: `/api/invoices/${invoiceNumber}/download`
  });

  return invoice;
};

/**
 * Render responsive, printable HTML invoice
 */
export const renderInvoiceHTML = (invoice, companySettings = {}) => {
  const company = {
    businessName: companySettings.businessName || 'WebinarFlow Automation Pvt. Ltd.',
    address: companySettings.address || 'Tech Innovation Tower, Cyber City, Bangalore, KA 560100',
    contactEmail: companySettings.contactEmail || 'billing@webinarflow.io',
    contactPhone: companySettings.contactPhone || '+91 80 4920 1200',
    gstin: companySettings.gstin || '29AABCU9603R1ZM'
  };

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tax Invoice ${invoice.invoiceNumber} - WebinarFlow</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; color: #0f172a; background: #f8fafc; }
      .invoice-card { max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0; padding: 48px; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 32px; margin-bottom: 32px; }
      .brand { font-size: 26px; font-weight: 800; color: #4f46e5; letter-spacing: -0.5px; }
      .brand span { color: #0f172a; }
      .badge-paid { background: #dcfce7; color: #15803d; font-weight: 700; padding: 6px 16px; border-radius: 9999px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid #bbf7d0; }
      .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 36px; }
      .meta-box h4 { font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 8px; font-weight: 700; }
      .meta-box p { font-size: 14px; line-height: 1.6; color: #334155; }
      .meta-box strong { color: #0f172a; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
      th, td { text-align: left; padding: 14px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
      th { background: #f8fafc; font-weight: 700; color: #475569; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
      td.amount { text-align: right; font-weight: 600; }
      .summary-wrap { display: flex; justify-content: flex-end; margin-bottom: 40px; }
      .totals-table { width: 320px; }
      .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: #475569; }
      .grand-total { font-size: 18px; font-weight: 800; border-top: 2px solid #0f172a; padding-top: 14px; margin-top: 6px; color: #0f172a; }
      .footer { border-top: 1px solid #f1f5f9; padding-top: 24px; font-size: 13px; color: #94a3b8; text-align: center; line-height: 1.6; }
      .actions-bar { max-width: 800px; margin: 0 auto 24px; display: flex; justify-content: space-between; align-items: center; }
      .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; font-size: 14px; font-weight: 600; border-radius: 8px; cursor: pointer; text-decoration: none; border: none; }
      .btn-primary { background: #4f46e5; color: #fff; }
      .btn-secondary { background: #e2e8f0; color: #1e293b; }
      @media print {
        body { background: #fff; padding: 0; }
        .invoice-card { box-shadow: none; border: none; padding: 0; }
        .actions-bar { display: none; }
      }
    </style>
  </head>
  <body>
    <div class="actions-bar">
      <button class="btn btn-secondary" onclick="window.print()">🖨️ Print Invoice</button>
      <a href="/api/invoices/${invoice.invoiceNumber}/pdf" class="btn btn-primary">⬇️ Download PDF Invoice</a>
    </div>

    <div class="invoice-card">
      <div class="header">
        <div>
          <div class="brand">Webinar<span>Flow</span></div>
          <div style="color: #64748b; font-size: 13px; margin-top: 4px;">Official Tax Invoice & Payment Receipt</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">GSTIN: ${company.gstin}</div>
        </div>
        <div style="text-align: right;">
          <div class="badge-paid">✓ PAID & VERIFIED</div>
          <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 12px;">Invoice #: ${invoice.invoiceNumber}</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Date: ${new Date(invoice.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>
      
      <div class="details-grid">
        <div class="meta-box">
          <h4>Billed To (Participant):</h4>
          <p>
            <strong>${invoice.customer.name}</strong><br>
            Email: ${invoice.customer.email}<br>
            Phone: ${invoice.customer.phone || 'N/A'}<br>
            Registration ID: <code>${invoice.registrationId}</code>
          </p>
        </div>
        <div class="meta-box" style="text-align: right;">
          <h4>Issuer (Organizer):</h4>
          <p>
            <strong>${company.businessName}</strong><br>
            ${company.address}<br>
            Email: ${company.contactEmail}<br>
            Phone: ${company.contactPhone}
          </p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item & Masterclass Description</th>
            <th style="width: 100px; text-align: center;">Qty</th>
            <th style="width: 140px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(i => `
            <tr>
              <td>
                <strong>${i.description}</strong><br>
                <span style="font-size: 12px; color: #64748b;">Scheduled for November 4, 2026 • Live Access + GitHub Repo + Lifetime Q&A Mastermind</span>
              </td>
              <td style="text-align: center;">1</td>
              <td class="amount">₹${Number(i.amount).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="summary-wrap">
        <div class="totals-table">
          <div class="total-row">
            <span>Net Taxable Amount</span>
            <span>₹${Number(invoice.subtotal).toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>CGST (9%)</span>
            <span>₹${(Number(invoice.tax) / 2).toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>SGST (9%)</span>
            <span>₹${(Number(invoice.tax) / 2).toFixed(2)}</span>
          </div>
          <div class="total-row grand-total">
            <span>Total Paid (INR)</span>
            <span>₹${Number(invoice.total).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        <p><strong>Payment Reference:</strong> ${invoice.paymentId || 'RAZORPAY_VERIFIED_CAPTURED'} • <strong>Webinar Date:</strong> November 4, 2026</p>
        <p style="margin-top: 6px;">This is a digitally verified tax invoice issued by WebinarFlow Platform. For billing inquiries, email ${company.contactEmail}.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

/**
 * Generate native binary PDF document using PDFKit
 */
export const buildInvoicePDF = (invoice, companySettings = {}) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  const company = {
    businessName: companySettings.businessName || 'WebinarFlow Automation Pvt. Ltd.',
    address: companySettings.address || 'Tech Innovation Tower, Cyber City, Bangalore, KA 560100',
    contactEmail: companySettings.contactEmail || 'support@webinarflow.io',
    contactPhone: companySettings.contactPhone || '+91 80 4920 1200',
    gstin: companySettings.gstin || '29AABCU9603R1ZM'
  };

  // Header Brand
  doc.fontSize(22).fillColor('#4f46e5').text('WebinarFlow', 40, 40);
  doc.fontSize(10).fillColor('#64748b').text('Official Tax Invoice & Receipt', 40, 68);
  doc.text(`GSTIN: ${company.gstin}`, 40, 82);

  // Status Badge
  doc.fontSize(12).fillColor('#15803d').text('PAID & VERIFIED', 420, 42, { align: 'right' });
  doc.fontSize(10).fillColor('#0f172a').text(`Invoice #: ${invoice.invoiceNumber}`, 420, 60, { align: 'right' });
  doc.fillColor('#64748b').text(`Date: ${new Date(invoice.createdAt || Date.now()).toLocaleDateString()}`, 420, 75, { align: 'right' });

  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(40, 105).lineTo(555, 105).stroke();

  // Participant details
  doc.fontSize(10).fillColor('#64748b').text('BILLED TO (PARTICIPANT):', 40, 120);
  doc.fontSize(12).fillColor('#0f172a').text(invoice.customer.name, 40, 136);
  doc.fontSize(10).fillColor('#334155').text(`Email: ${invoice.customer.email}`, 40, 152);
  doc.text(`Phone: ${invoice.customer.phone || 'N/A'}`, 40, 166);
  doc.text(`Registration ID: ${invoice.registrationId}`, 40, 180);

  // Issuer details
  doc.fontSize(10).fillColor('#64748b').text('ISSUED BY:', 320, 120, { align: 'right' });
  doc.fontSize(12).fillColor('#0f172a').text(company.businessName, 320, 136, { align: 'right' });
  doc.fontSize(10).fillColor('#334155').text(company.address, 320, 152, { align: 'right' });
  doc.text(`Email: ${company.contactEmail}`, 320, 180, { align: 'right' });

  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(40, 205).lineTo(555, 205).stroke();

  // Table Header
  doc.rect(40, 215, 515, 24).fill('#f8fafc');
  doc.fontSize(10).fillColor('#475569').text('DESCRIPTION', 50, 222);
  doc.text('QTY', 380, 222, { width: 40, align: 'center' });
  doc.text('AMOUNT (INR)', 440, 222, { width: 105, align: 'right' });

  // Items
  let y = 250;
  invoice.items.forEach(item => {
    doc.fontSize(11).fillColor('#0f172a').text(item.description, 50, y);
    doc.fontSize(9).fillColor('#64748b').text('Scheduled for November 4, 2026 • Live Masterclass + GitHub Starter Kit', 50, y + 14);
    doc.fontSize(10).fillColor('#0f172a').text('1', 380, y + 5, { width: 40, align: 'center' });
    doc.fontSize(10).fillColor('#0f172a').text(`₹${Number(item.amount).toFixed(2)}`, 440, y + 5, { width: 105, align: 'right' });
    y += 40;
  });

  doc.strokeColor('#e2e8f0').lineWidth(1).moveTo(40, y + 10).lineTo(555, y + 10).stroke();

  // Totals
  y += 20;
  doc.fontSize(10).fillColor('#475569').text('Taxable Subtotal:', 340, y);
  doc.fontSize(10).fillColor('#0f172a').text(`₹${Number(invoice.subtotal).toFixed(2)}`, 440, y, { width: 105, align: 'right' });

  y += 18;
  doc.fontSize(10).fillColor('#475569').text('GST (18%):', 340, y);
  doc.fontSize(10).fillColor('#0f172a').text(`₹${Number(invoice.tax).toFixed(2)}`, 440, y, { width: 105, align: 'right' });

  y += 20;
  doc.strokeColor('#0f172a').lineWidth(1.5).moveTo(340, y).lineTo(555, y).stroke();
  y += 8;
  doc.fontSize(12).fillColor('#0f172a').text('TOTAL PAID:', 340, y);
  doc.fontSize(12).fillColor('#4f46e5').text(`₹${Number(invoice.total).toFixed(2)}`, 440, y, { width: 105, align: 'right' });

  // Footer notes
  doc.fontSize(9).fillColor('#94a3b8').text(
    `Payment Ref: ${invoice.paymentId || 'RAZORPAY_VERIFIED'} | Class Scheduled: November 4, 2026\nComputer-generated tax receipt. Questions? Email ${company.contactEmail}`,
    40,
    720,
    { align: 'center', width: 515 }
  );

  return doc;
};
