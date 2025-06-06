const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let pacientes = [];

// GET - Listar pacientes
app.get('/api/pacientes', (req, res) => {
  res.json(pacientes);
});

// POST - Agregar paciente
app.post('/api/pacientes', (req, res) => {
  const nuevoPaciente = { _id: uuidv4(), ...req.body };
  pacientes.push(nuevoPaciente);
  res.status(201).json(nuevoPaciente);
});

// PUT - Editar paciente
app.put('/api/pacientes/:id', (req, res) => {
  const id = req.params.id;
  pacientes = pacientes.map(p =>
    p._id === id ? { ...p, ...req.body } : p
  );
  res.json({ mensaje: 'Paciente actualizado' });
});

// DELETE - Eliminar paciente
app.delete('/api/pacientes/:id', (req, res) => {
  const id = req.params.id;
  pacientes = pacientes.filter(p => p._id !== id);
  res.json({ mensaje: 'Paciente eliminado' });
});

// Ruta raíz para probar que el servidor corre
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

app.listen(port, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${port}`);
});


let odontologos = [];

// GET - Listar odontólogos
app.get('/api/odontologos', (req, res) => {
  res.json(odontologos);
});

// POST - Agregar odontólogo
app.post('/api/odontologos', (req, res) => {
  const nuevoOdontologo = { _id: uuidv4(), ...req.body };
  odontologos.push(nuevoOdontologo);
  res.status(201).json(nuevoOdontologo);
});

// PUT - Editar odontólogo
app.put('/api/odontologos/:id', (req, res) => {
  const id = req.params.id;
  odontologos = odontologos.map(o =>
    o._id === id ? { ...o, ...req.body } : o
  );
  res.json({ mensaje: 'Odontólogo actualizado' });
});

// DELETE - Eliminar odontólogo
app.delete('/api/odontologos/:id', (req, res) => {
  const id = req.params.id;
  odontologos = odontologos.filter(o => o._id !== id);
  res.json({ mensaje: 'Odontólogo eliminado' });
});

