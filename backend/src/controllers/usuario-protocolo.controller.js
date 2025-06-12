// GET /api/usuario-protocolo/investigador
import { pool } from '../config/db.js';

export const obtenerUsuarioActualParaProtocolo = async (req, res) => {
  const noDeControl = req.user.no_decontrol_usuario;

  try {
    const [rows] = await pool.query(`
      SELECT u.no_decontrol_usuario, u.nombre_pila, u.primer_apellido, u.segunda_apellido,
             u.correo_electronico, u.telefono, u.extension,
             d.nombre_departamento AS departamento
      FROM usuario u
      LEFT JOIN departamento d ON u.ID_departamento_usuario = d.ID_departamento
      WHERE u.no_decontrol_usuario = ?
    `, [noDeControl]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario investigador:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
