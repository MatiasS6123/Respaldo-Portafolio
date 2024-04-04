// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rut: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
