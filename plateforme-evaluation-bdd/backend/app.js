require('dotenv').config();
require('./config/db');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const subjectRoutes = require('./routes/subject.routes');
const submissionRoutes = require('./routes/submission.routes');
const aiRoutes = require('./routes/ai.routes');

const app = express();

// Sécurité & parsing
app.use(helmet());
app.use(cors());
app.use(express.json());

// Montage des routes
app.use('/api/auth',    authRoutes);
app.use('/api/users',   userRoutes);
app.use('/api/subjects',subjectRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/ai',      aiRoutes);

// Serveur de fichiers uploadés
app.use('/uploads', express.static('uploads'));

// 404 pour les routes inconnues
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion centralisée des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Erreur serveur.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
