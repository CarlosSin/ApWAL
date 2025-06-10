import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import deptosRoutes from './routes/deptos.routes.js';
import personalesRoutes from './routes/datos-personales.routes.js';
import protocoloRoutes from './routes/protocolo.routes.js';

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

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
