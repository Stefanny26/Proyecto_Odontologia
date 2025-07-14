const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  paciente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paciente', 
    required: true 
  },
  odontologo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Odontologo', 
    required: true 
  },
  motivo: { type: String, required: true },
  estado: { 
    type: String, 
    enum: ['Programada', 'Completada', 'Cancelada'], 
    default: 'Programada' 
  },
  observaciones: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Cita', CitaSchema);
