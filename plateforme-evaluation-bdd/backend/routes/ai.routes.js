const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const aiController = require('../controllers/ai.controller');

// Route pour lancer la correction d'une soumission via l'IA
router.post('/corriger', verifyToken, requireRole('professeur'), aiController.correctSubmission);

module.exports = router;
