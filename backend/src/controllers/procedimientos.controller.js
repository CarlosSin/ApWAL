// backend/src/controllers/procedimientos-experimentales.controller.js
import { pool } from '../config/db.js';

// 🔹 Crear (o insertar si no existe)
export const guardarProcedimientos = async (req, res) => {
  const { ID_registro_protocolo, alojamiento_animal, procedimientos, otros_comentarios } = req.body;

  try {
    await pool.query(
      `INSERT INTO procedimientos_experimentales
        (ID_registro_protocolo, alojamiento_animal, procedimientos, otros_comentarios)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         alojamiento_animal = VALUES(alojamiento_animal),
         procedimientos = VALUES(procedimientos),
         otros_comentarios = VALUES(otros_comentarios)`,
      [ID_registro_protocolo, alojamiento_animal, JSON.stringify(procedimientos), otros_comentarios]
    );

    res.status(200).json({ message: 'Procedimientos guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar procedimientos:', error);
    res.status(500).json({ error: 'Error al guardar procedimientos' });
  }
};
// 🔹 Obtener por protocolo
export const obtenerProcedimientos = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM procedimientos_experimentales WHERE ID_registro_protocolo = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos' });
    }

    const proc = rows[0];
    res.json({
      alojamiento_animal: proc.alojamiento_animal,
      procedimientos: JSON.parse(proc.procedimientos || '{}'),
      otros_comentarios: proc.otros_comentarios
    });
  } catch (error) {
    console.error('Error al obtener procedimientos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// 🔹 Actualizar por protocolo
export const actualizarProcedimientos = async (req, res) => {
  const { id } = req.params;
  const { alojamiento_animal, procedimientos, otros_comentarios } = req.body;

  try {
    await pool.query(
      `UPDATE procedimientos_experimentales
       SET alojamiento_animal = ?, procedimientos = ?, otros_comentarios = ?
       WHERE ID_registro_protocolo = ?`,
      [alojamiento_animal, JSON.stringify(procedimientos), otros_comentarios, id]
    );

    res.status(200).json({ message: 'Procedimientos actualizados correctamente' });
  } catch (error) {
    console.error('Error al actualizar procedimientos:', error);
    res.status(500).json({ error: 'Error al actualizar procedimientos' });
  }
};
