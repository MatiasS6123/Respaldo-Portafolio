const multer = require('multer');
const path = require('path');

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, '../../upload'); // Ruta relativa
    cb(null, uploadPath); // Asegúrate de que esta ruta existe y es accesible
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar conflictos
  }
});

// Exporta la configuración de Multer para que otros archivos puedan usarla
module.exports = multer({ storage: storage });
