import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables del .env

export const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    // Paso 1: Verificar usuario y obtener info básica
    const [rows] = await pool.execute(
      `SELECT u.no_decontrol_usuario, u.ID_departamento_usuario, d.nombre_departamento
       FROM usuario u
       LEFT JOIN departamento d ON u.ID_departamento_usuario = d.ID_departamento
       WHERE u.nombre_usuario = ? AND u.password = ? AND u.estado_usuario = 1`,
      [usuario, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
    }

    const { no_decontrol_usuario, nombre_departamento } = rows[0];

    // Paso 2: Obtener roles
    const [rolesRows] = await pool.execute(
      `SELECT r.nombre_rol 
       FROM usuario_rol ur 
       JOIN rol r ON ur.id_rol = r.id_rol 
       WHERE ur.no_decontrol_usuario = ? AND ur.puede_iniciar_sesion = 1`,
      [no_decontrol_usuario]
    );

    const roles = rolesRows.map(r => r.nombre_rol);

    // Paso 3: Generar JWT
    const token = jwt.sign(
      {
        no_decontrol_usuario,
        usuario,
        roles,
        departamento: nombre_departamento || '---'
      },
      process.env.JWT_SECRET || 'secreto-temporal',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // Paso 4: Respuesta
    return res.json({
      ok: true,
      usuario: {
        nombre_usuario: usuario,
        no_decontrol: no_decontrol_usuario,
        departamento: nombre_departamento || '---',
        roles
      },
      token
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ ok: false, msg: 'Error en el servidor' });
  }
};
