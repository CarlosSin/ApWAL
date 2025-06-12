import { pool } from '../config/db.js';

// 🔹 Guardar o actualizar registros de eutanasia por protocolo y animal
export const guardarEutanasia = async (req, res) => {
  const { ID_registro_protocolo, registros } = req.body;

  if (!registros || !Array.isArray(registros)) {
    return res.status(400).json({ error: 'Registros no válidos' });
  }

  try {
    const queries = registros.map(registro => {
      const {
        ID_registro_animales_protocolo,
        agente,
        via_administracion,
        dosis
      } = registro;

      return pool.query(
        `INSERT INTO eutanasia (
          ID_registro_protocolo,
          ID_registro_animales_protocolo,
          agente,
          via_administracion,
          dosis
        )
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          agente = VALUES(agente),
          via_administracion = VALUES(via_administracion),
          dosis = VALUES(dosis)`,
        [ID_registro_protocolo, ID_registro_animales_protocolo, agente, via_administracion, dosis]
      );
    });

    await Promise.all(queries);

    res.status(200).json({ message: 'Datos de eutanasia guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar eutanasia:', error);
    res.status(500).json({ error: 'Error al guardar eutanasia' });
  }
};

// 🔹 Obtener datos de eutanasia por protocolo
export const obtenerEutanasiaPorProtocolo = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM eutanasia WHERE ID_registro_protocolo = ?`,
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener eutanasia:', error);
    res.status(500).json({ error: 'Error al obtener eutanasia' });
  }
};
