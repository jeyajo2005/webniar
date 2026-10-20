import express from 'express';
import { getInvoiceByNumber, downloadInvoiceReceipt, downloadInvoicePDF } from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/:invoiceNumber', getInvoiceByNumber);
router.get('/:invoiceNumber/download', downloadInvoiceReceipt);
router.get('/:invoiceNumber/pdf', downloadInvoicePDF);

export default router;
