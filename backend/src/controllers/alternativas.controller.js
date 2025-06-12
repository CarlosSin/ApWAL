import { pool } from '../config/db.js';

// Crear alternativas
export const guardarAlternativas = async (req, res) => {
  const { ID_registro_protocolo, descripcion_alternativas } = req.body;

  try {
    await pool.query(
    `INSERT INTO alternativas (ID_registro_protocolo, descripcion_alternativas)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE descripcion_alternativas = VALUES(descripcion_alternativas)`,
    [ID_registro_protocolo, descripcion_alternativas]
  );

    res.status(201).json({ message: 'Alternativas guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar alternativas:', error);
    res.status(500).json({ error: 'Error al guardar alternativas' });
  }
};

// Obtener alternativas
export const obtenerAlternativas = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM alternativas WHERE ID_registro_protocolo = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron alternativas' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener alternativas:', error);
    res.status(500).json({ error: 'Error al obtener alternativas' });
  }
};

// Actualizar alternativas
export const actualizarAlternativas = async (req, res) => {
  const { id } = req.params;
  const { descripcion_alternativas } = req.body;

  try {
    await pool.query(
      `UPDATE alternativas SET descripcion_alternativas = ? WHERE ID_registro_protocolo = ?`,
      [descripcion_alternativas, id]
    );

    res.status(200).json({ message: 'Alternativas actualizadas correctamente' });
  } catch (error) {
    console.error('Error al actualizar alternativas:', error);
    res.status(500).json({ error: 'Error al actualizar alternativas' });
  }
};
