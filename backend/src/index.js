import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import deptosRoutes from './routes/deptos.routes.js';
import bibliotecaRoutes from './routes/biblioteca.routes.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/deptos', deptosRoutes);
app.use('/api/recursos', bibliotecaRoutes);


//Ruta  para servir los PDFs
app.use('/uploads', express.static(path.resolve(__dirname, '../public/uploads')));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
