const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rut: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    tipo_usuario: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Cambiado de "contraseña" a "password"
});
module.exports = mongoose.model('User', userSchema);
