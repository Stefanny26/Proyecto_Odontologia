const Odontologo = require('../models/odontologo.model');

exports.getAll = async (req, res) => {
  const odontologos = await Odontologo.find();
  res.json(odontologos);
};

exports.create = async (req, res) => {
  const nuevo = new Odontologo(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
};

exports.update = async (req, res) => {
  const actualizado = await Odontologo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
};

exports.delete = async (req, res) => {
  await Odontologo.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
