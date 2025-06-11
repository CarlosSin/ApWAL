// backend/src/controllers/animales-protocolo.controller.js
import { pool } from '../config/db.js';

// Obtener animales seleccionados por protocolo
export const obtenerAnimalesPorProtocolo = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT ID_registro_animales_protocolo, linea, cantidad, frecuencia_uso
       FROM animales_protocolo
       WHERE ID_registro_protocolo = ?`,
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener animales del protocolo:', error);
    res.status(500).json({ error: 'Error al obtener animales del protocolo' });
  }
};
