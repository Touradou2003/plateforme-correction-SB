const mongoose = require('mongoose');

const correctionSchema = new mongoose.Schema({
  soumission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  note: { type: Number, required: true },
  feedback: { type: String }, // Commentaire détaillé
  fichierCorrige: { type: String }, // (optionnel) correction PDF
  dateGeneration: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Correction', correctionSchema);
