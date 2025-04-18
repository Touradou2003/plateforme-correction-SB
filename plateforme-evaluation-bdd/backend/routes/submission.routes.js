const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const submissionController = require('../controllers/submission.controller');
const upload = require('../middlewares/upload.middleware');

// Route pour soumettre une réponse (upload de fichier PDF)
router.post('/soumettre', verifyToken, upload.single('fichier'), submissionController.submit);

// Route pour obtenir les détails d'une soumission via son ID
router.get('/:id', verifyToken, submissionController.getSubmission);

module.exports = router;
