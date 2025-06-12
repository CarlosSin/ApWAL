import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';


/*
router.get('/', (req, res) => {
  res.json([{ id: 1, nombre: 'Ejemplo', correo: 'ejemplo@email.com' }]);
});
*/
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

console.log('Ruta usuario lista');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = req.body;
    delete nuevoUsuario.rol;
    delete nuevoUsuario.puede_iniciarsecion;

    nuevoUsuario.no_decontrol_admin = 1111;// este mumero es probicional hasta que se tengo lo de el inicio de secion de forma correcta
    await pool.query('INSERT INTO usuario SET ?', [nuevoUsuario]);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ error: 'Error al insertar usuario' });
  }
});

router.post('/rool', async (req, res) => {
  try {
    const rol = req.body;
    await pool.query('INSERT INTO usuario_rol SET ?', [rol]);
    res.status(201).json({ message: 'rol creado' });
  } catch (error) {
    console.error('Error al insertar rol:', error);
    res.status(500).json({ error: 'Error al insertar rol' });
  }
});

router.post('/actualizar', async (req, res) => {
  try {
    const actualizarUsuario = req.body;
    delete actualizarUsuario.rol;
    delete actualizarUsuario.puede_iniciarsecion;

    const sql = `
      UPDATE usuario
      SET
        nombre_pila = ?,
        primer_apellido = ?,
        segunda_apellido = ?,
        telefono = ?,
        extension = ?,
        fecha_registro = ?,
        correo_electronico = ?,
        nombre_usuario = ?,
        password = ?,
        grado_estudio = ?,
        estado_usuario = ?,
        ID_departamento_usuario = ?
      WHERE
        no_decontrol_usuario = ?;
    `;

    const values = [
      actualizarUsuario.nombre_pila,
      actualizarUsuario.primer_apellido,
      actualizarUsuario.segunda_apellido,
      actualizarUsuario.telefono,
      actualizarUsuario.extension,
      actualizarUsuario.fecha_registro, // Asegúrate de que el formato de fecha sea compatible con tu DB
      actualizarUsuario.correo_electronico,
      actualizarUsuario.nombre_usuario,
      actualizarUsuario.grado_estudio,
      actualizarUsuario.estado_usuario,
      actualizarUsuario.ID_departamento_usuario,
      actualizarUsuario.no_decontrol_usuario // Este es el valor para la cláusula WHERE
    ];
    const [result] = await pool.query(sql, values);
    //await pool.query(' UPDATE usuario SET nombre_pila = actualizarUsuario.nombre_pila, primer_apellido = actualizarUsuario.primer_apellido, segunda_apellido = actualizarUsuario.segunda_apellido, telefono = actualizarUsuario.telefono, extension = actualizarUsuario.extension, fecha_registro = actualizarUsuario.fecha_registro, correo_electronico = actualizarUsuario.correo_electronico, nombre_usuario = actualizarUsuario.nombre_usuario, password = actualizarUsuario.password, grado_estudio = actualizarUsuario.grado_estudio, estado_usuario = actualizarUsuario.estado_usuario, ID_departamento_usuario = actualizarUsuario.ID_departamento_usuario WHERE no_decontrol_usuario = actualizarUsuario.no_decontrol_usuario; );
    //res.status(201).json({ message: 'Usuario creado' });
        // Verifica si se afectó alguna fila para saber si el usuario fue encontrado y actualizado.
    if (result.affectedRows > 0) {
      console.log(`Usuario con no_decontrol_usuario ${actualizarUsuario.no_decontrol_usuario} actualizado exitosamente.`);
      // Para una actualización exitosa, el status 200 OK es apropiado.
      res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
    } else {
      console.log(`No se encontró usuario con no_decontrol_usuario ${actualizarUsuario.no_decontrol_usuario} para actualizar.`);
      res.status(404).json({ error: 'Usuario no encontrado o no se realizaron cambios.' });
    }
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).json({ error: 'Error al insertar usuario' });
  }
});

export default router;