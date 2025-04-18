const Submission = require('../models/submission.model');

exports.submit = async (req, res) => {
  try {
    const { sujet: subjectId } = req.body;
    const fichier = req.file.filename;

    const submission = new Submission({
      sujet: subjectId,
      etudiant: req.userId,
      fichier,
    });
    await submission.save();
    res.status(201).json({ message: 'Soumission enregistrée.', submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('etudiant', 'nom email')
      .populate('sujet');
    if (!submission) {
      return res.status(404).json({ message: 'Soumission non trouvée.' });
    }
    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
