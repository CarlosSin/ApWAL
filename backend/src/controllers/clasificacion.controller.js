import { pool } from '../config/db.js';

// 🔹 Crear o actualizar clasificación
export const guardarClasificacion = async (req, res) => {
  const { ID_registro_protocolo, clasificacion } = req.body;

  try {
    await pool.query(
      `INSERT INTO clasificacion (ID_registro_protocolo, clasificacion)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE clasificacion = VALUES(clasificacion)`,
      [ID_registro_protocolo, clasificacion]
    );

    res.status(201).json({ message: 'Clasificación guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar clasificación:', error);
    res.status(500).json({ error: 'Error al guardar clasificación' });
  }
};

// 🔹 Obtener clasificación por protocolo
export const obtenerClasificacion = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM clasificacion WHERE ID_registro_protocolo = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró la clasificación' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener clasificación:', error);
    res.status(500).json({ error: 'Error al obtener clasificación' });
  }
};
