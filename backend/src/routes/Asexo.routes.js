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

console.log('Ruta sexo lista');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('select cepa.ID_registro_especie, cepa.ID_registro_cepa, sexo.ID_registro_sexo, especie.nombre_especie, cepa.nombre_cepa, sexo.nombre_sexo, sexo.disponibilidad_sexo FROM ((cepa INNER JOIN especie ON cepa.ID_registro_especie = especie.ID_registro_especie) INNER JOIN sexo ON cepa.ID_registro_cepa = sexo.ID_registro_cepa)');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener sexo' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevosexo = req.body;

    await pool.query('INSERT INTO sexo SET ?', [nuevosexo]);
    res.status(201).json({ message: 'sexo creado' });
  } catch (error) {
    console.error('Error al insertar sexo:', error);
    res.status(500).json({ error: 'Error al insertar sexo' });
  }
});

export default router;