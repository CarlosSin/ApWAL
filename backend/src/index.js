import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usa las rutas
//app.use('/api/auth', authRoutes);
import usuarioRoutes from './routes/usuarios.routes.js';
app.use('/api/usuarios',usuarioRoutes);

import deptosRoutes from './routes/deptos.routes.js';
app.use('/api/deptos', deptosRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
