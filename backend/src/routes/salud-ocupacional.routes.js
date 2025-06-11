import { Router } from 'express';
import { getAnimalesConSaludOcupacional, guardarSaludOcupacional } from '../controllers/salud-ocupacional.controller.js';

const router = Router();

// Obtener animales y sus datos de salud ocupacional
router.get('/:protocoloId', getAnimalesConSaludOcupacional);

// Guardar o actualizar datos
router.post('/', guardarSaludOcupacional);

export default router;
