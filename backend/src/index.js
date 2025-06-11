import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usa las rutas
app.use('/api/auth', authRoutes);

//ruta de usuario
import usuarioRoutes from './routes/usuarios.routes.js';
app.use('/api/usuarios',usuarioRoutes);

//ruta de departamentos
import deptosRoutes from './routes/deptos.routes.js';
app.use('/api/deptos', deptosRoutes);

//-------------------------------------atributos------------------------------------
//ruta de especie
import especieRoutes from './routes/Aespecie.routes.js';
app.use('/api/A-especie', especieRoutes);

//ruta de cepa
import cepaRoutes from './routes/Acepa.routes.js';
app.use('/api/A-cepa', cepaRoutes);

import sexoRoutes from './routes/Asexo.routes.js';
app.use('/api/A-sexo', sexoRoutes);

import edadopesoRoutes from './routes/Aedadopeso.routes.js';
app.use('/api/A-edadopeso', edadopesoRoutes);
//----------------------------------------------------------------------------------

//ruta catalogo animal
import animalcatalogoRoutes from './routes/catalogoanimal.routes.js';
app.use('/api/animales', animalcatalogoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
