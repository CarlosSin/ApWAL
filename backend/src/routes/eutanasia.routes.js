import { Router } from 'express';
import {
  guardarEutanasia,
  obtenerEutanasiaPorProtocolo
} from '../controllers/eutanasia.controller.js';

const router = Router();

// Obtener todos los registros de eutanasia para un protocolo
router.get('/:id', obtenerEutanasiaPorProtocolo);

// Guardar o actualizar registros de eutanasia
router.post('/', guardarEutanasia);

export default router;
