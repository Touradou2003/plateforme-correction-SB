const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  sujet: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fichier: { type: String, required: true }, // PDF soumis
  dateSoumission: { type: Date, default: Date.now },
  note: { type: Number }, // Générée par l’IA
  statut: { type: String, enum: ['en attente', 'corrigé'], default: 'en attente' }
});

module.exports = mongoose.model('Submission', submissionSchema);
