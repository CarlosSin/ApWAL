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
export default router;