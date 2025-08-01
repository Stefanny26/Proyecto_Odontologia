const Cita = require('../models/cita.model');

// Obtener todas las citas
exports.getAll = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('paciente', 'nombres telefono')
      .populate('odontologo', 'nombre especialidad telefono email') // Se agregó el campo 'nombre'
      .sort({ fecha: -1, hora: -1 }); // Se cambió a orden descendente
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear cita
exports.create = async (req, res) => {
  try {
    console.log('Datos recibidos para crear cita:', req.body);
    const nueva = new Cita(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear cita:', error);
    res.status(400).json({ error: error.message });
  }
};

// Obtener citas por fecha
exports.getCitasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const citas = await Cita.find({ fecha: fecha });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cita
exports.update = async (req, res) => {
  try {
    const actualizada = await Cita.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate('paciente odontologo');
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar cita
exports.delete = async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Alias para compatibilidad
exports.crearCita = exports.create;
exports.obtenerCitasPorFecha = exports.getCitasPorFecha;
