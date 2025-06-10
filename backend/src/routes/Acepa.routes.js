import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

console.log('Ruta cepa lista');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cepa');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener cepa' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevacepa = req.body;

    await pool.query('INSERT INTO cepa SET ?', [nuevacepa]);
    res.status(201).json({ message: 'cepa creada' });
  } catch (error) {
    console.error('Error al insertar cepa:', error);
    res.status(500).json({ error: 'Error al insertar cepa' });
  }
});

export default router;