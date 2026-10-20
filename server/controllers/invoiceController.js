import InvoiceModel from '../models/Invoice.js';
import WebinarModel from '../models/Webinar.js';
import { renderInvoiceHTML, buildInvoicePDF } from '../services/invoiceService.js';

export const getInvoiceByNumber = async (req, res, next) => {
  try {
    const { invoiceNumber } = req.params;
    const invoice = await InvoiceModel.findOne({ invoiceNumber });
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found.' });
    }
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    next(error);
  }
};

export const downloadInvoiceReceipt = async (req, res, next) => {
  try {
    const { invoiceNumber } = req.params;
    const invoice = await InvoiceModel.findOne({ invoiceNumber });
    if (!invoice) {
      return res.status(404).send('<h2>Invoice Not Found</h2>');
    }
    const webinar = (await WebinarModel.find())[0];
    const html = renderInvoiceHTML(invoice, webinar?.companySettings);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', `inline; filename="${invoiceNumber}.html"`);
    res.send(html);
  } catch (error) {
    next(error);
  }
};

export const downloadInvoicePDF = async (req, res, next) => {
  try {
    const { invoiceNumber } = req.params;
    const invoice = await InvoiceModel.findOne({ invoiceNumber });
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    const webinar = (await WebinarModel.find())[0];
    const doc = buildInvoicePDF(invoice, webinar?.companySettings);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${invoiceNumber}.pdf"`);
    doc.pipe(res);
    doc.end();
  } catch (error) {
    next(error);
  }
};
