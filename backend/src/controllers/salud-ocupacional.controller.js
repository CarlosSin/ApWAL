import { pool } from '../config/db.js';

// Obtener datos de salud ocupacional por protocolo
export const getSaludOcupacional = async (req, res) => {
  try {
    const ID_registro_protocolo = req.params.protocoloId;

    // Datos por animal
    const [animales] = await pool.query(
      `SELECT a.*, s.agentes_infecciosos, s.radioisotopos, s.carcinogenos, s.toxicos
       FROM animales_protocolo a
       LEFT JOIN animales_salud_ocupacional s
         ON a.ID_registro_protocolo = s.ID_registro_protocolo
         AND a.ID_registro_animales_protocolo = s.ID_registro_animales_protocolo
       WHERE a.ID_registro_protocolo = ?`,
      [ID_registro_protocolo]
    );

    // Datos generales
    const [generales] = await pool.query(
      `SELECT nivel_bioseguridad, equipos, procedimientos
       FROM salud_ocupacional_general
       WHERE ID_registro_protocolo = ?`,
      [ID_registro_protocolo]
    );

    res.json({
      animales,
      generales: generales[0] || null
    });
  } catch (error) {
    console.error('Error al obtener datos de salud ocupacional:', error);
    res.status(500).json({ error: 'Error al obtener datos de salud ocupacional' });
  }
};

// Guardar o actualizar datos generales y por animal
export const guardarSaludOcupacional = async (req, res) => {
  const { ID_registro_protocolo, datosAnimales, nivel_bioseguridad, equipos, procedimientos } = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Guardar o actualizar datos generales
    const [generales] = await connection.query(
      `SELECT 1 FROM salud_ocupacional_general WHERE ID_registro_protocolo = ?`,
      [ID_registro_protocolo]
    );

    if (generales.length > 0) {
      await connection.query(
        `UPDATE salud_ocupacional_general
         SET nivel_bioseguridad = ?, equipos = ?, procedimientos = ?
         WHERE ID_registro_protocolo = ?`,
        [nivel_bioseguridad, equipos, procedimientos, ID_registro_protocolo]
      );
    } else {
      await connection.query(
        `INSERT INTO salud_ocupacional_general (ID_registro_protocolo, nivel_bioseguridad, equipos, procedimientos)
         VALUES (?, ?, ?, ?)`,
        [ID_registro_protocolo, nivel_bioseguridad, equipos, procedimientos]
      );
    }

    // Guardar o actualizar datos por animal
    for (const animal of datosAnimales) {
      const {
        ID_registro_animales_protocolo,
        agentes_infecciosos,
        radioisotopos,
        carcinogenos,
        toxicos,
      } = animal;

      const [rows] = await connection.query(
        `SELECT 1 FROM animales_salud_ocupacional
         WHERE ID_registro_protocolo = ? AND ID_registro_animales_protocolo = ?`,
        [ID_registro_protocolo, ID_registro_animales_protocolo]
      );

      if (rows.length > 0) {
        await connection.query(
          `UPDATE animales_salud_ocupacional
           SET agentes_infecciosos = ?, radioisotopos = ?, carcinogenos = ?, toxicos = ?
           WHERE ID_registro_protocolo = ? AND ID_registro_animales_protocolo = ?`,
          [
            agentes_infecciosos,
            radioisotopos,
            carcinogenos,
            toxicos,
            ID_registro_protocolo,
            ID_registro_animales_protocolo,
          ]
        );
      } else {
        await connection.query(
          `INSERT INTO animales_salud_ocupacional
           (agentes_infecciosos, radioisotopos, carcinogenos, toxicos, ID_registro_protocolo, ID_registro_animales_protocolo)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            agentes_infecciosos,
            radioisotopos,
            carcinogenos,
            toxicos,
            ID_registro_protocolo,
            ID_registro_animales_protocolo,
          ]
        );
      }
    }

    await connection.commit();
    res.status(200).json({ message: 'Datos de salud ocupacional guardados correctamente' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al guardar datos de salud ocupacional:', error);
    res.status(500).json({ error: 'Error al guardar datos de salud ocupacional' });
  } finally {
    connection.release();
  }
};
