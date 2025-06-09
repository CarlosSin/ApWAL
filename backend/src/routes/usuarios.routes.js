import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';


/*
router.get('/', (req, res) => {
  res.json([{ id: 1, nombre: 'Ejemplo', correo: 'ejemplo@email.com' }]);
});
*/
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

console.log('🧪 Conectando a DB con:');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('User:', process.env.DB_USER);

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = req.body;
    delete nuevoUsuario.rol;
    delete nuevoUsuario.puede_iniciarsecion;

    nuevoUsuario.no_decontrol_admin = 1111;// este mumero es probicional hasta que se tengo lo de el inicio de secion de forma correcta
    await pool.query('INSERT INTO usuario SET ?', [nuevoUsuario]);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ error: 'Error al insertar usuario' });
  }
});

export default router;