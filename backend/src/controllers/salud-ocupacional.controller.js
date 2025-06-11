import { pool } from '../config/db.js';

// Obtener animales + sus datos de salud ocupacional
export const getAnimalesConSaludOcupacional = async (req, res) => {
  try {
    const ID_registro_protocolo = req.params.protocoloId;

    const [animales] = await pool.query(
      `SELECT a.*, s.nivel_bioseguridad, s.agentes_infecciosos, s.radioisotopos, s.carcinogenos, s.toxicos
       FROM animales_protocolo a
       LEFT JOIN salud_ocupacional s
       ON a.ID_registro_protocolo = s.ID_registro_protocolo
       AND a.ID_registro_animales_protocolo = s.ID_registro_animales_protocolo
       WHERE a.ID_registro_protocolo = ?`,
      [ID_registro_protocolo]
    );

    res.json(animales);
  } catch (error) {
    console.error('Error al obtener datos de salud ocupacional:', error);
    res.status(500).json({ error: 'Error al obtener datos de salud ocupacional' });
  }
};

// Guardar o actualizar datos por cada animal
export const guardarSaludOcupacional = async (req, res) => {
  const { ID_registro_protocolo, datos } = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    for (const animal of datos) {
      const {
        ID_registro_animales_protocolo,
        nivel_bioseguridad,
        agentes_infecciosos,
        radioisotopos,
        carcinogenos,
        toxicos,
      } = animal;

      const [rows] = await connection.query(
        `SELECT 1 FROM salud_ocupacional WHERE ID_registro_protocolo = ? AND ID_registro_animales_protocolo = ?`,
        [ID_registro_protocolo, ID_registro_animales_protocolo]
      );

      if (rows.length > 0) {
        await connection.query(
          `UPDATE salud_ocupacional
           SET nivel_bioseguridad = ?, agentes_infecciosos = ?, radioisotopos = ?, carcinogenos = ?, toxicos = ?
           WHERE ID_registro_protocolo = ? AND ID_registro_animales_protocolo = ?`,
          [
            nivel_bioseguridad,
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
          `INSERT INTO salud_ocupacional (nivel_bioseguridad, agentes_infecciosos, radioisotopos, carcinogenos, toxicos, ID_registro_protocolo, ID_registro_animales_protocolo)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            nivel_bioseguridad,
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
