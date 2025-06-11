import express from 'express';
import { crearProtocolo, actualizarProtocolo, obtenerProtocolosRevision } from '../controllers/protocolo.controller.js';

const router = express.Router();

// Crear nuevo protocolo
router.post('/', crearProtocolo);

// Actualizar protocolo existente por ID
router.put('/:id', actualizarProtocolo);
router.get('/en-revision', obtenerProtocolosRevision);


export default router;
