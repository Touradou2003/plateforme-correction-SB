const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

// Route pour obtenir le profil de l'utilisateur connecté
router.get('/profile', verifyToken, userController.getProfile);

module.exports = router;
