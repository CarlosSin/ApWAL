import { pool } from '../config/db.js';

// 🔹 Obtener descripción de animal por protocolo
export const obtenerDescripcionAnimal = async (req, res) => {
  const { id } = req.params;
  try {
    const [descRows] = await pool.query(
      `SELECT * FROM descripcion_animal WHERE ID_registro_protocolo = ?`,
      [id]
    );

    const [animalesRows] = await pool.query(
      `SELECT * FROM animales_protocolo WHERE ID_registro_protocolo = ?`,
      [id]
    );

    if (descRows.length === 0) {
      return res.status(404).json({ message: 'No se encontró la descripción del protocolo' });
    }

    res.json({
      descripcion: descRows[0],
      animales: animalesRows
    });
  } catch (error) {
    console.error('Error al obtener descripción de animal:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// 🔹 Crear descripción de animal
export const crearDescripcionAnimal = async (req, res) => {
  const { ID_registro_protocolo, justificacion, alojamiento_animal, animales } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 🔍 Verificar si ya existe descripción para este protocolo
    const [existing] = await conn.query(
      `SELECT 1 FROM descripcion_animal WHERE ID_registro_protocolo = ?`,
      [ID_registro_protocolo]
    );

    if (existing.length > 0) {
      // 🔄 Ya existe → actualiza
      await conn.query(
        `UPDATE descripcion_animal
         SET justificacion = ?, alojamiento_animal = ?
         WHERE ID_registro_protocolo = ?`,
        [justificacion, alojamiento_animal, ID_registro_protocolo]
      );

      // 🧹 Borra animales asociados previamente
      await conn.query(
        `DELETE FROM animales_protocolo WHERE ID_registro_protocolo = ?`,
        [ID_registro_protocolo]
      );
    } else {
      // 🆕 No existe → inserta
      await conn.query(
        `INSERT INTO descripcion_animal (ID_registro_protocolo, alojamiento_animal, justificacion)
         VALUES (?, ?, ?)`,
        [ID_registro_protocolo, alojamiento_animal, justificacion]
      );
    }

    // 🔁 Inserta animales seleccionados
    for (const animal of animales) {
      await conn.query(
        `INSERT INTO animales_protocolo (ID_registro_animales_protocolo, cantidad, frecuencia_uso, linea, ID_registro_protocolo)
         VALUES (NULL, ?, ?, ?, ?)`,
        [animal.cantidad, animal.frecuencia_uso, animal.linea, ID_registro_protocolo]
      );
    }

    await conn.commit();
    res.status(201).json({ message: 'Descripción guardada o actualizada con éxito' });

  } catch (error) {
    await conn.rollback();
    console.error('Error al guardar descripción:', error);
    res.status(500).json({ error: 'Error al guardar la información' });
  } finally {
    conn.release();
  }
};


// 🔹 Actualizar descripción de animal
export const actualizarDescripcionAnimal = async (req, res) => {
  const { id } = req.params;
  const { justificacion, alojamiento_animal, animales } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Actualizar descripción
    await conn.query(
      `UPDATE descripcion_animal SET justificacion = ?, alojamiento_animal = ? WHERE ID_registro_protocolo = ?`,
      [justificacion, alojamiento_animal, id]
    );

    // Borrar animales previos asociados
    await conn.query(
      `DELETE FROM animales_protocolo WHERE ID_registro_protocolo = ?`,
      [id]
    );

    // Insertar nuevos animales
    for (const animal of animales) {
      await conn.query(
        `INSERT INTO animales_protocolo (ID_registro_animales_protocolo, cantidad, frecuencia_uso, linea, ID_registro_protocolo)
         VALUES (NULL, ?, ?, ?, ?)`,
        [animal.cantidad, animal.frecuencia_uso, animal.linea, id]
      );
    }

    await conn.commit();
    res.json({ message: 'Descripción actualizada correctamente' });
  } catch (error) {
    await conn.rollback();
    console.error('Error al actualizar descripción:', error);
    res.status(500).json({ error: 'Error al actualizar la información' });
  } finally {
    conn.release();
  }
};
