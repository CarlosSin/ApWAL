import { pool } from '../config/db.js';
import path from 'path';
import fs from 'fs';

// GET - Obtener todos los recursos
export const obtenerRecursos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        bd.ID_recurso, 
        bd.nombre, 
        bd.descripcion, 
        tr.nombre AS tipo,
        bd.ruta, 
        bd.fecha_creacion 
      FROM BibliotecaDigital bd
      JOIN TipoRecurso tr ON bd.ID_tipo = tr.ID_tipo_recurso
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


// GET - Obtener todos los recursos
export const obtenerTiposRecurso = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM TipoRecurso');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener tipos de recurso:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// POST - Agregar nuevo recurso
export const agregarRecurso = async (req, res) => {
  try {
    const { nombre, descripcion, tipo } = req.body;
    const archivo = req.file;

    if (!archivo) return res.status(400).json({ error: 'No se subió ningún archivo' });

    const ruta = `/uploads/${archivo.filename}`;

    await pool.query(`
      INSERT INTO BibliotecaDigital (nombre, descripcion, ID_tipo, ruta)
      VALUES (?, ?, ?, ?)
    `, [nombre, descripcion, tipo, ruta]);

    res.status(201).json({ mensaje: 'Recurso agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar recurso:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// DELETE - Eliminar recurso
export const eliminarRecurso = async (req, res) => {
  try {
    const { id } = req.params;

    const [[recurso]] = await pool.query(`
      SELECT ruta FROM BibliotecaDigital WHERE ID_recurso = ?
    `, [id]);

    if (!recurso) return res.status(404).json({ error: 'Recurso no encontrado' });

    const filePath = path.join('public', recurso.ruta);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await pool.query(`DELETE FROM BibliotecaDigital WHERE ID_recurso = ?`, [id]);

    res.json({ mensaje: 'Recurso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar recurso:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }

};


export const actualizarRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    let { nombre, descripcion, tipo } = req.body;
    const archivo = req.file;

    const tipoNumerico = parseInt(tipo, 10);
    if (isNaN(tipoNumerico) || !nombre || !descripcion) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    let query = '';
    let params = [];

    if (archivo) {
      const ruta = `/uploads/${archivo.filename}`;
      query = `
        UPDATE BibliotecaDigital
        SET nombre = ?, descripcion = ?, ID_tipo = ?, ruta = ?
        WHERE ID_recurso = ?
      `;
      params = [nombre, descripcion, tipoNumerico, ruta, id];
    } else {
      query = `
        UPDATE BibliotecaDigital
        SET nombre = ?, descripcion = ?, ID_tipo = ?
        WHERE ID_recurso = ?
      `;
      params = [nombre, descripcion, tipoNumerico, id];
    }

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Recurso no encontrado o sin cambios' });
    }

    res.json({ mensaje: 'Recurso actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar recurso:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};






