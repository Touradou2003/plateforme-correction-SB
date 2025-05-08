const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    console.log('Raw request body:', req.body);
    const { nom, email, password, role } = req.body;
    console.log('Parsed registration data:', { nom, email, role });
    
    // Validation détaillée des champs
    const missingFields = [];
    if (!nom) missingFields.push('nom');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!role) missingFields.push('role');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Champs manquants', 
        missingFields,
        receivedData: { nom, email, role }
      });
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Format d\'email invalide' });
    }

    // Validation du rôle
    if (!['student', 'professor'].includes(role)) {
      return res.status(400).json({ 
        message: 'Rôle invalide', 
        receivedRole: role,
        validRoles: ['student', 'professor']
      });
    }

    try {
      // Vérifier si l'utilisateur existe déjà
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Email déjà utilisé.' });
      }

      // Hash du mot de passe
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Créer le nouvel utilisateur
      user = new User({
        nom,
        email,
        motDePasse: hash,
        role,
        provider: 'local'
      });

      // Sauvegarder l'utilisateur
      await user.save();
      console.log('User saved successfully:', user._id);

      // Génération du token
      const payload = { id: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });

      // Préparer la réponse avec les données utilisateur
      const userResponse = {
        id: user._id,
        firstName: user.nom.split(' ')[0],
        lastName: user.nom.split(' ').slice(1).join(' '),
        email: user.email,
        role: user.role,
        submissionsCount: 0,
        averageScore: 0
      };

      res.status(201).json({ user: userResponse, token });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      if (dbError.code === 11000) {
        return res.status(400).json({ message: 'Email déjà utilisé.' });
      }
      if (dbError.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Erreur de validation', 
          errors: Object.values(dbError.errors).map(err => err.message)
        });
      }
      throw dbError; // Re-throw to be caught by outer try-catch
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: 'Erreur serveur.', 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

exports.login = async (req, res) => {
  console.log('Login request received:', req.body);
  try {
    const { email, password } = req.body;
    
    // Vérifier si tous les champs requis sont présents
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await bcrypt.compare(password, user.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Génération du token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Préparer la réponse avec les données utilisateur
    const userResponse = {
      id: user._id,
      firstName: user.nom.split(' ')[0],
      lastName: user.nom.split(' ').slice(1).join(' '),
      email: user.email,
      role: user.role,
      submissionsCount: 0, // À implémenter si nécessaire
      averageScore: 0 // À implémenter si nécessaire
    };

    res.json({ user: userResponse, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};
