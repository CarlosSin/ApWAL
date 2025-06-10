import { pool } from '../config/db.js';

// ✅ Obtener datos generales por ID de protocolo
export const obtenerDatosGenerales = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM datos_generales WHERE ID_registro_protocolo = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Datos generales no encontrados' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener datos generales:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

// ✅ Crear nuevos datos generales
export const crearDatosGenerales = async (req, res) => {
  const { ID_registro_protocolo, titulo, descripcion, fecha_inicio, fecha_termino, es_colaboracion } = req.body;

  try {
    await pool.query(
      `INSERT INTO datos_generales
        (ID_registro_protocolo, titulo, descripcion, fecha_inicio, fecha_termino, es_colaboracion)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [ID_registro_protocolo, titulo, descripcion, fecha_inicio, fecha_termino, es_colaboracion]
    );
    res.status(201).json({ message: 'Datos generales guardados' });
  } catch (error) {
    console.error('Error al guardar datos generales:', error);
    res.status(500).json({ error: 'Error al guardar' });
  }
};

// ✅ Actualizar datos generales existentes
export const actualizarDatosGenerales = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_inicio, fecha_termino, es_colaboracion } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE datos_generales
       SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_termino = ?, es_colaboracion = ?
       WHERE ID_registro_protocolo = ?`,
      [titulo, descripcion, fecha_inicio, fecha_termino, es_colaboracion, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    res.json({ message: 'Datos generales actualizados correctamente' });
  } catch (error) {
    console.error('Error al actualizar datos generales:', error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

