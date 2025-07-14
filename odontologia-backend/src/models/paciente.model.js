const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Paciente', pacienteSchema);
