import { pool } from '../config/db.js';

// Obtener datos para la confirmación del protocolo
export const obtenerDatosConfirmacion = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener info del investigador y del protocolo
    const [usuario] = await pool.query(
      `SELECT u.nombre_pila AS nombre, d.nombre_departamento AS departamento,
          dg.fecha_inicio, dg.fecha_termino
          FROM protocolo p
          JOIN usuario u ON p.no_decontrol_investigador = u.no_decontrol_usuario
          JOIN departamento d ON u.ID_departamento_usuario = d.ID_departamento
          LEFT JOIN datos_generales dg ON p.ID_registro_protocolo = dg.ID_registro_protocolo
          WHERE p.ID_registro_protocolo = ?`,
      [id]
    );

    // Obtener fechas de inicio y fin desde datos_generales
    const [fechas] = await pool.query(
      `SELECT fecha_inicio, fecha_termino FROM datos_generales WHERE ID_registro_protocolo = ?`,
      [id]
    );

    if (usuario.length === 0 || fechas.length === 0) {
      return res.status(404).json({ message: 'Datos no encontrados' });
    }

    // Actualizar la fecha de elaboración a la fecha actual
    await pool.query(
      `UPDATE protocolo SET fecha_elaboracion = CURDATE() WHERE ID_registro_protocolo = ?`,
      [id]
    );

    res.json({
      nombre: usuario[0].nombre,
      departamento: usuario[0].departamento,
      fecha_inicio: fechas[0].fecha_inicio,
      fecha_termino: fechas[0].fecha_termino,
      fecha_elaboracion: new Date().toISOString().slice(0, 10)
    });
  } catch (error) {
    console.error('Error al obtener datos de confirmación:', error);
    res.status(500).json({ error: 'Error al obtener datos de confirmación' });
  }
};

export const enviarAlCICUAL = async (req, res) => {
  const { protocoloId } = req.params;

  try {
    const [result] = await pool.query(
      `UPDATE protocolo SET estado_protocolo = 'R' WHERE ID_registro_protocolo = ?`,
      [protocoloId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Protocolo no encontrado' });
    }

    res.json({ message: 'Protocolo enviado al CICUAL correctamente' });
  } catch (error) {
    console.error('Error al enviar protocolo al CICUAL:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
