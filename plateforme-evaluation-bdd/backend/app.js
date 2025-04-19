require('dotenv').config();
require('./config/db');

const express = require('express');
const mongoose = require('mongoose');
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
app.use('/auth',    authRoutes);
app.use('/users',   userRoutes);
app.use('/subjects',subjectRoutes);
app.use('/submissions', submissionRoutes);
app.use('/ai',      aiRoutes);

// Serveur de fichiers uploadés
app.use('/uploads', express.static('uploads'));

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 404 pour les routes inconnues
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion centralisée des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
