
const multer = require('multer');
const path = require('path');

// Définition du stockage avec un dossier "uploads" et un nom unique pour le fichier
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filtre pour n'accepter que les fichiers PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF sont autorisés.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5 Mo
  fileFilter: fileFilter
});

module.exports = upload;
