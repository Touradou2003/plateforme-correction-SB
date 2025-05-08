require('dotenv').config();
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
app.use('/api/auth',        authRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/subjects',    subjectRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/ai',          aiRoutes);

// Serveur de fichiers uploadés
app.use('/uploads', express.static('uploads'));

// Connexion à MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://touks:touks123@cluster0.mongodb.net/plateforme-eval?retryWrites=true&w=majority';
console.log('Attempting to connect to MongoDB...');
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
    console.log('MongoDB URI:', MONGODB_URI);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if we can't connect to the database
  });

// Log MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

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
