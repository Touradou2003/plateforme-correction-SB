const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const subjectController = require('../controllers/subject.controller');

// Route pour déposer un sujet (accessible uniquement aux professeurs)
router.post('/deposer-sujet', verifyToken, requireRole('professeur'), subjectController.depositSubject);

// Route pour obtenir la liste de tous les sujets
router.get('/', verifyToken, subjectController.listSubjects);

// Route pour obtenir le détail d'un sujet à partir de son ID
router.get('/:id', verifyToken, subjectController.getSubjectById);

module.exports = router;
