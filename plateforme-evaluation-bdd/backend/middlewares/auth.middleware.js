
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Accès refusé : aucun token fourni.' });
  }
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Format du token invalide.' });
  }
  
  const token = parts[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide.' });
    }
    // Ajoute les informations utilisateur dans la requête pour les middlewares suivants ou les contrôleurs
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = { verifyToken };
