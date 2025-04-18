const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  fichier: { type: String }, // Chemin vers le fichier PDF
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  correctionsModeles: [{ type: String }], // Texte ou chemin vers fichiers modèle
  dateDepot: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subject', subjectSchema);
