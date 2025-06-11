// backend/src/routes/animales-protocolo.routes.js
import { Router } from 'express';
import { obtenerAnimalesPorProtocolo } from '../controllers/animales-protocolo.controller.js';

const router = Router();

// Obtener animales seleccionados por protocolo
router.get('/:id', obtenerAnimalesPorProtocolo);

export default router;
