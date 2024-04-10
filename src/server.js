const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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
// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
