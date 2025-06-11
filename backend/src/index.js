import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import deptosRoutes from './routes/deptos.routes.js';
import personalesRoutes from './routes/datos-personales.routes.js';
import protocoloRoutes from './routes/protocolo.routes.js';
import datosGeneralesRoutes from './routes/datos-generales.routes.js';
import descripcionAnimalRoutes from './routes/descripcion-animal.routes.js';
import procedimientosRoutes from './routes/procedimientos.routes.js';
import alternativasRoutes from './routes/alternativas.routes.js';
import agenteATARoutes from './routes/agente-ata.routes.js';
import eutanasiaRoutes from './routes/eutanasia.routes.js';
import clasificacionRoutes from './routes/clasificacion.routes.js';
import saludOcupacionalRoutes from './routes/salud-ocupacional.routes.js';
import confirmacionRoutes from './routes/confirmacion.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usa las rutas

app.use('/api/auth', authRoutes);
app.use('/api/usuarios',usuarioRoutes);
app.use('/api/deptos', deptosRoutes);
app.use('/api/datos-personales', personalesRoutes);
app.use('/api/protocolo', protocoloRoutes);
app.use('/api/datos-generales', datosGeneralesRoutes);

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

app.use('/api/descripcion-animal', descripcionAnimalRoutes);

app.use('/api/procedimientos', procedimientosRoutes);


app.use('/api/eutanasia', eutanasiaRoutes);


app.use('/api/alternativas', alternativasRoutes);
app.use('/api/agente-ata', agenteATARoutes);

app.use('/api/clasificacion', clasificacionRoutes);


app.use('/api/salud-ocupacional', saludOcupacionalRoutes);

// app.js o server.js

app.use('/api/confirmacion', confirmacionRoutes);

import animalesProtocoloRoutes from './routes/animales-protocolo.routes.js';
app.use('/api/animales-protocolo', animalesProtocoloRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
