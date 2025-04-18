const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-motDePasse');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

