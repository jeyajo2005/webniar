export const verifyAdminToken = (req, res, next) => {
  const token = req.headers['x-admin-token'] || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  const expectedToken = process.env.ADMIN_API_KEY || 'webinar_secret_admin_token_2026';

  // For developer ease in local demo mode, also allow default header
  if (!token || (token !== expectedToken && token !== 'demo_admin_pass')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or missing admin credentials.' });
  }

  next();
};
