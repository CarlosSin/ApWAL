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

console.log('Ruta edadopeso lista');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT especie.ID_registro_especie, cepa.ID_registro_cepa, sexo.ID_registro_sexo, edadopeso.ID_registro_edadopeso, especie.nombre_especie, cepa.nombre_cepa, sexo.nombre_sexo, edadopeso.nombre_edadopeso, edadopeso.descripcion_edadopeso, edadopeso.disponibilidad_edadopeso FROM edadopeso INNER JOIN sexo ON edadopeso.ID_registro_sexo = sexo.ID_registro_sexo INNER JOIN cepa ON sexo.ID_registro_cepa = cepa.ID_registro_cepa INNER JOIN especie ON cepa.ID_registro_especie = especie.ID_registro_especie');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener edadopeso' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevaedadopeso = req.body;

    await pool.query('INSERT INTO edadopeso SET ?', [nuevaedadopeso]);
    res.status(201).json({ message: 'edadopeso creado' });
  } catch (error) {
    console.error('Error al insertar edadopeso:', error);
    res.status(500).json({ error: 'Error al insertar sexo' });
  }
});

export default router;
