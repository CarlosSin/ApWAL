import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
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
    const [rows] = await pool.query('SELECT * FROM departamento');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoDepartamento = req.body;

    await pool.query('INSERT INTO departamento SET ?', [nuevoDepartamento]);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ error: 'Error al insertar usuario' });
  }
});

export default router;
