import express from 'express';
import { crearProtocolo, actualizarProtocolo, getProtocolosRevisionPorUsuario, getProtocolosAprobadosPorUsuario, getProtocolosEnProcesoPorUsuario, getProtocolosNoAprobadosPorUsuario, getProtocolosAprobadosConRecomendacionesPorUsuario, cambiarEstadoProtocolo, obtenerTodosLosProtocolos  } from '../controllers/protocolo.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Crear nuevo protocolo
router.post('/', crearProtocolo);

// Actualizar protocolo existente por ID
router.put('/:id', actualizarProtocolo);

router.get('/revision-del-usuario', verifyToken, getProtocolosRevisionPorUsuario);
router.get('/aprobados-del-usuario', verifyToken, getProtocolosAprobadosPorUsuario);
router.get('/no-aprobados-del-usuario', verifyToken, getProtocolosNoAprobadosPorUsuario);
router.get('/en-proceso-del-usuario', verifyToken, getProtocolosEnProcesoPorUsuario);
router.get('/aprobados-recomendaciones-del-usuario', verifyToken, getProtocolosAprobadosConRecomendacionesPorUsuario);

router.put('/cambiar-estado/:id', cambiarEstadoProtocolo);
router.get('/todos', obtenerTodosLosProtocolos);
export default router;
