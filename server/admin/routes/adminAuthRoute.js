const AdminAuthController = require('../controllers/adminAuthController');

module.exports = (server) => {
    server.get('/api/adminAuth', AdminAuthController.verifyAdmin);
};
