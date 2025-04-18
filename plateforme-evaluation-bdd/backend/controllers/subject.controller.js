const Subject = require('../models/subject.model');

exports.depositSubject = async (req, res) => {
  try {
    const { titre, description } = req.body;
    const fichier = req.file ? req.file.filename : null;
    const subject = new Subject({
      titre,
      description,
      fichier,
      professeur: req.userId,
    });
    await subject.save();
    res.status(201).json({ message: 'Sujet déposé avec succès.', subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.listSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('professeur', 'nom email');
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('professeur', 'nom email');
    if (!subject) {
      return res.status(404).json({ message: 'Sujet non trouvé.' });
    }
    res.json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};