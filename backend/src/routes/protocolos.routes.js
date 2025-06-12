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

console.log('Ruta protocolos lista');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('select protocolo.ID_registro_protocolo, protocolo.estado_protocolo, protocolo.fecha_elaboracion, datos_generales.titulo FROM protocolo INNER JOIN datos_generales ON protocolo.ID_registro_protocolo = datos_generales.ID_registro_protocolo;');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener protocolos' });
  }
});


export default router;