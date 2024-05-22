const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const cron = require('node-cron');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


// Configurar Middleware
app.use(cors());
app.use(bodyParser.json());



// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Prueba', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));

// Definir rutas

app.use('/api/users', require('./routes/userRoutes')); // Ejemplo de ruta para usuarios
app.use('/api/estudiante', require('./routes/estudianteRoute/estudianteRoutes'));
app.use('/api/salida',require('./routes/salidaRoutes/salidaRoutes'));
app.use('/api/curso',require('./routes/gestionCursoRoutes/gestionCursoRoutes'));
app.use('/api/asistencia',require('./routes/asistenciaRoutes/asistenciaRoutes'));
app.use('/api/bitacora',require('./routes/bitacoraRoutes/bitacoraRoutes'));
app.use('/api/nota',require('./routes/notaRoutes/notaRoutes'));
app.use('/api/anotacion',require('./routes/anotacionRoutes/anotacionRoutes'));
app.use('/api/apoderado',require('./routes/apoderadoRoutes/apoderadoRoutes'));
app.use('/api/citacion',require('./routes/citacionRoutes/citacionRoutes'));
app.use('/api/diagnostico',require('./routes/diagnosticoRoutes/diagnosticoRoutes'));
app.use('/api/material',require('./routes/material_claseRoutes/material_claseRoutes'));
app.use('/src/upload', express.static('src/upload'));
app.use('/api/planificacion', require('./routes/planificarClaseRoutes/planificarClaseRRoutes'));
app.use('/api/ingreso', require('./routes/ingresoRoutes/ingresoRoutes'));

// Iniciar servidor

function executeBackup() {
    const backupPath = path.resolve('C:\\Users\\Lenovo\\Documents\\Prueba2\\P\\src\\backup');
    const dbName = 'Prueba';
    exec(`mongodump -d ${dbName} --out "${backupPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al hacer el backup: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Backup exitoso: ${stdout}`);
    });
}
// Programar tarea cron para ejecutar el backup automático cada 2 horas
cron.schedule('*/2 * * * *', () => {
    console.log('Iniciando backup automático...');
    
});

app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
