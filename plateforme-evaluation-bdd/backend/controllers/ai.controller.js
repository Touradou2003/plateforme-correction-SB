const Submission = require('../models/submission.model');
const Correction = require('../models/correction.model');
const aiService = require('../utils/ai.service'); // Hypothétique service IA

exports.correctSubmission = async (req, res) => {
  try {
    const { submissionId } = req.body;
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Soumission non trouvée.' });
    }
    // Appel au service IA pour corriger
    const { note, feedback } = await aiService.correct(submission);

    const correction = new Correction({
      soumission: submission._id,
      note,
      feedback,
    });
    await correction.save();

    submission.note = note;
    submission.statut = 'corrigé';
    await submission.save();

    res.json({ message: 'Correction effectuée.', note, feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
