module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'pella2-secret-key',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@pela.events',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
};
