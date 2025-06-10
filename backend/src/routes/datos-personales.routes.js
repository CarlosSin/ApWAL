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

// Obtener investigador/suplente por número de control
router.get('/:noControl', async (req, res) => {
  const noControl = req.params.noControl;

  try {
    const [rows] = await pool.query(`
      SELECT
        u.no_decontrol_usuario AS noControl,
        CONCAT(u.nombre_pila, ' ', u.primer_apellido, ' ', u.segunda_apellido) AS nombre,
        u.correo_electronico AS email,
        u.telefono,
        u.extension,
        d.nombre_departamento AS departamento
      FROM usuario u
      LEFT JOIN departamento d ON u.ID_departamento_usuario = d.ID_departamento
      WHERE u.no_decontrol_usuario = ?
    `, [noControl]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener investigador' });
  }
});

export default router;
