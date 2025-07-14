const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(cors({
  origin: 'http://localhost:4200', // O '*' para desarrollo
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/citas', require('./routes/cita.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/odontologos', require('./routes/odontologo.routes'));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
