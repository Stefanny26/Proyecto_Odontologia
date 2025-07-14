# 🦷 Sistema de Gestión de Citas Odontológicas

Sistema completo para gestionar pacientes, odontólogos y citas en una clínica dental.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** con Express
- **MongoDB** con Mongoose
- **CORS** para comunicación frontend-backend
- **dotenv** para variables de entorno

### Frontend
- **Angular 17+** (Standalone Components)
- **TypeScript**
- **Bootstrap 5** para estilos
- **Reactive Forms** para formularios

## 📁 Estructura del Proyecto

```
Proyecto_Citas_Odontologicas/
├── odontologia-backend/          # Servidor Node.js
│   ├── src/
│   │   ├── config/              # Configuración DB
│   │   ├── controllers/         # Controladores
│   │   ├── models/             # Modelos de datos
│   │   ├── routes/             # Rutas API
│   │   └── server.js           # Servidor principal
│   └── package.json
├── odontologia-app/             # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/       # Servicios HTTP
│   │   │   ├── components/     # Componentes
│   │   │   └── pages/          # Páginas
│   │   └── main.ts
│   └── package.json
└── README.md
```

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/Stefanny26/Proyecto_Odontologia.git
cd Proyecto_Odontologia
```

### 2. Configurar Backend
```bash
cd odontologia-backend
npm install

# Crear archivo .env
echo "PORT=4000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/odontologia" >> .env

# Iniciar servidor
npm start
# o
node src/server.js
```

### 3. Configurar Frontend
```bash
cd ../odontologia-app
npm install

# Iniciar aplicación
ng serve
```

## 🌐 Uso

1. **Backend**: `http://localhost:4000`
2. **Frontend**: `http://localhost:4200`

### APIs Disponibles
- `GET/POST /api/pacientes` - Gestión de pacientes
- `GET/POST /api/odontologos` - Gestión de odontólogos  
- `GET/POST /api/citas` - Gestión de citas
- `GET /api/citas/fecha/:fecha` - Citas por fecha

## 📱 Funcionalidades

### ✅ Gestión de Pacientes
- Crear, editar, eliminar pacientes
- Validación de formularios
- Lista completa de pacientes

### ✅ Gestión de Odontólogos
- Administrar profesionales
- Especialidades médicas
- Información de contacto

### ✅ Sistema de Citas
- Agendar nuevas citas
- Ver disponibilidad por fecha/hora
- Estados: Programada, Completada, Cancelada
- Gestión completa (CRUD)

## 🛠️ Desarrollo

### Requisitos previos
- Node.js 18+
- Angular CLI 17+
- MongoDB 4.4+

### Comandos útiles
```bash
# Backend - Desarrollo con nodemon
cd odontologia-backend
npm run dev

# Frontend - Servidor de desarrollo
cd odontologia-app
ng serve --open
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Stefanny26** - [GitHub](https://github.com/Stefanny26)

---

⭐ ¡Dale una estrella si te parece útil este proyecto!