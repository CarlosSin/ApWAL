import { pool } from '../config/db.js';

// 🔹 Crear o actualizar agente ATA para un animal dentro de un protocolo
export const guardarAgenteATA = async (req, res) => {
  const { ID_registro_protocolo, registros } = req.body;

  if (!registros || !Array.isArray(registros)) {
    return res.status(400).json({ error: 'Registros no válidos' });
  }

  try {
    const queries = registros.map((registro) => {
      const {
        ID_registro_animales_protocolo,
        agente,
        via_administracion,
        dosis,
        dosis_complementaria,
        frecuencia_administracion,
        medios,
      } = registro;

      return pool.query(
        `INSERT INTO agente_ata (
          ID_registro_protocolo,
          ID_registro_animales_protocolo,
          agente,
          via_administracion,
          dosis,
          dosis_complementaria,
          frecuencia_administracion,
          medios
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          agente = VALUES(agente),
          via_administracion = VALUES(via_administracion),
          dosis = VALUES(dosis),
          dosis_complementaria = VALUES(dosis_complementaria),
          frecuencia_administracion = VALUES(frecuencia_administracion),
          medios = VALUES(medios)`,
        [
          ID_registro_protocolo,
          ID_registro_animales_protocolo,
          agente,
          via_administracion,
          dosis,
          dosis_complementaria,
          frecuencia_administracion,
          medios
        ]
      );
    });

    await Promise.all(queries);

    res.status(200).json({ message: 'Agentes ATA guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar agentes ATA:', error);
    res.status(500).json({ error: 'Error al guardar agentes ATA' });
  }
};

// 🔹 Obtener todos los agentes ATA registrados para un protocolo
export const obtenerAgentesATA = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM agente_ata WHERE ID_registro_protocolo = ?`,
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener agentes ATA:', error);
    res.status(500).json({ error: 'Error al obtener agentes ATA' });
  }
};

// 🔹 Obtener un agente ATA específico por protocolo y animal
export const obtenerAgentePorAnimal = async (req, res) => {
  const { protocoloId, animalId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM agente_ata
       WHERE ID_registro_protocolo = ? AND ID_registro_animales_protocolo = ?`,
      [protocoloId, animalId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró información del agente para este animal' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener agente ATA por animal:', error);
    res.status(500).json({ error: 'Error al obtener agente ATA por animal' });
  }
};
