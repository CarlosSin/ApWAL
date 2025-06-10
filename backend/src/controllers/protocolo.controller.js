import { pool } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables del .env

// POST - Crear protocolo
export const crearProtocolo = async (req, res) => {
  const { no_decontrol_investigador, no_decontrol_suplente } = req.body;

  try {
    const [result] = await pool.query(`
      INSERT INTO protocolo (
        ID_tipo_proto, estado_protocolo, fecha_elaboracion, vigencia,
        no_decontrol_investigador, no_decontrol_suplente
      ) VALUES (1, NULL, '1000-01-01', NULL, ?, ?)
    `, [no_decontrol_investigador, no_decontrol_suplente]);

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error al crear protocolo:', err);
    res.status(500).json({ message: 'Error al guardar protocolo', error: err });
  }
};

export const actualizarProtocolo = async (req, res) => {
  const { id } = req.params;
  const { no_decontrol_investigador, no_decontrol_suplente } = req.body;

  try {
    const [result] = await pool.query(`
      UPDATE protocolo
      SET no_decontrol_investigador = ?, no_decontrol_suplente = ?
      WHERE ID_registro_protocolo = ?
    `, [no_decontrol_investigador, no_decontrol_suplente, id]);

    res.status(200).json({ message: 'Protocolo actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar protocolo:', err);
    res.status(500).json({ message: 'Error al actualizar protocolo', error: err });
  }
};
