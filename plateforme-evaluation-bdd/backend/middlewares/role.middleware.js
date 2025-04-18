
const requireRole = (role) => {
    return (req, res, next) => {
      if (!req.userRole) {
        return res.status(401).json({ message: 'Rôle utilisateur non trouvé.' });
      }
      if (req.userRole !== role) {
        return res.status(403).json({ message: 'Accès interdit : vous ne disposez pas du rôle requis.' });
      }
      next();
    };
  };
  
  module.exports = { requireRole };
  