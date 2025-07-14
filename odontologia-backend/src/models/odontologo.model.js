const mongoose = require('mongoose');

const odontologoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especialidad: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  genero: { type: String, enum: ['Femenino', 'Masculino'], required: true }
});

module.exports = mongoose.model('Odontologo', odontologoSchema);
