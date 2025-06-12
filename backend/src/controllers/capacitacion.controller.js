// capacitacion.controller.js (modificado)
import { pool } from '../config/db.js';

export const guardarCapacitacion = async (req, res) => {
  const { ID_registro_protocolo } = req.body;

  try {
 const archivoInv = req.files?.archivo_investigador?.[0]?.filename || null;
const archivoSupl = req.files?.archivo_suplente?.[0]?.filename || null;

    // Verificar si ya existe un registro para ese protocolo
    const [existe] = await pool.query(
      'SELECT 1 FROM capacitacion WHERE ID_registro_protocolo = ?',
      [ID_registro_protocolo]
    );

    if (existe.length > 0) {
      // Actualizar archivos
      await pool.query(
        `UPDATE capacitacion
         SET archivo_investigador = ?, archivo_suplente = ?
         WHERE ID_registro_protocolo = ?`,
        [archivoInv, archivoSupl, ID_registro_protocolo]
      );
    } else {
      // Insertar nuevo registro
      await pool.query(
        `INSERT INTO capacitacion (ID_registro_protocolo, archivo_investigador, archivo_suplente)
         VALUES (?, ?, ?)`,
        [ID_registro_protocolo, archivoInv, archivoSupl]
      );
    }

    res.status(200).json({ message: 'Archivos guardados correctamente' });

  } catch (error) {
    console.error('Error en guardarCapacitacion:', error);
    res.status(500).json({ message: 'Error al guardar archivos' });
  }
};
export const obtenerCapacitacion = async (req, res) => {
  const { protocoloId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT archivo_investigador, archivo_suplente FROM capacitacion WHERE ID_registro_protocolo = ?`,
      [protocoloId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron archivos para este protocolo.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener archivos de capacitación:', error);
    res.status(500).json({ error: 'Error al obtener archivos de capacitación' });
  }
};
