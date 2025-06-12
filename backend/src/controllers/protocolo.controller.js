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
      ) VALUES (1, 'R', '1000-01-01', NULL, ?, ?)
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


export const getProtocolosRevisionPorUsuario = async (req, res) => {
   const noControl = req.user.no_decontrol_usuario;; // id del usuario desde el token

  try {
    const [rows] = await pool.query(
      `SELECT ID_registro_protocolo, estado_protocolo, fecha_elaboracion
       FROM protocolo
       WHERE estado_protocolo = 'R' AND no_decontrol_investigador = ?`,
      [noControl]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener protocolos en revisión:', error);
    res.status(500).json({ message: 'Error al obtener protocolos en revisión' });
  }
};

export const getProtocolosAprobadosPorUsuario = async (req, res) => {
   const noControl = req.user.no_decontrol_usuario;; // id del usuario desde el token

  try {
    const [rows] = await pool.query(
      `SELECT ID_registro_protocolo, estado_protocolo, fecha_elaboracion
       FROM protocolo
       WHERE estado_protocolo = 'A' AND no_decontrol_investigador = ?`,
      [noControl]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener protocolos aprobados:', error);
    res.status(500).json({ message: 'Error al obtener protocolos aprobados' });
  }
};

export const getProtocolosNoAprobadosPorUsuario = async (req, res) => {
   const noControl = req.user.no_decontrol_usuario;; // id del usuario desde el token

  try {
    const [rows] = await pool.query(
      `SELECT ID_registro_protocolo, estado_protocolo, fecha_elaboracion
       FROM protocolo
       WHERE estado_protocolo = 'NA' AND no_decontrol_investigador = ?`,
      [noControl]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener protocolos no aprobados:', error);
    res.status(500).json({ message: 'Error al obtener protocolos no aprobados' });
  }
};

export const getProtocolosEnProcesoPorUsuario = async (req, res) => {
   const noControl = req.user.no_decontrol_usuario;; // id del usuario desde el token

  try {
    const [rows] = await pool.query(
      `SELECT ID_registro_protocolo, estado_protocolo, fecha_elaboracion
       FROM protocolo
       WHERE estado_protocolo = 'P' AND no_decontrol_investigador = ?`,
      [noControl]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener protocolos en proceso:', error);
    res.status(500).json({ message: 'Error al obtener protocolos en proceso' });
  }
};

export const getProtocolosAprobadosConRecomendacionesPorUsuario = async (req, res) => {
   const noControl = req.user.no_decontrol_usuario;; // id del usuario desde el token

  try {
    const [rows] = await pool.query(
      `SELECT ID_registro_protocolo, estado_protocolo, fecha_elaboracion
       FROM protocolo
       WHERE estado_protocolo = 'AR' AND no_decontrol_investigador = ?`,
      [noControl]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener protocolos aprobados con recomendaciones:', error);
    res.status(500).json({ message: 'Error al obtener protocolos aprobados con recomendaciones' });
  }
};

export const cambiarEstadoProtocolo = async (req, res) => {
  const { id } = req.params;
  const { nuevoEstado } = req.body;

  try {
    await pool.query(
      `UPDATE protocolo SET estado_protocolo = ? WHERE ID_registro_protocolo = ?`,
      [nuevoEstado, id]
    );
    res.status(200).json({ ok: true, msg: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error al cambiar estado:', error);
    res.status(500).json({ ok: false, msg: 'Error al cambiar estado' });
  }
};

export const obtenerTodosLosProtocolos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        ID_registro_protocolo AS ID_protocolo,
        estado_protocolo AS edo_protocolo,
        fecha_elaboracion AS fecha,
        CONCAT('Protocolo ', ID_registro_protocolo) AS nombre_protocolo
      FROM protocolo
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener todos los protocolos:', error);
    res.status(500).json({ message: 'Error al obtener protocolos' });
  }
};
