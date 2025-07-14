const Paciente = require('../models/paciente.model');

exports.getAll = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    const nuevo = new Paciente(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const actualizado = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Paciente.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });


};  }

