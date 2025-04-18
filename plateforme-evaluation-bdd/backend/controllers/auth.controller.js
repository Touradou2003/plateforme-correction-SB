const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { nom, email, motDePasse, role } = req.body;
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }
    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(motDePasse, salt);

    user = new User({ nom, email, motDePasse: hash, role });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }
    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }
    // Génération du token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
