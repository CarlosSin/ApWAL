import { Router } from 'express';
import {
  guardarClasificacion,
  obtenerClasificacion
} from '../controllers/clasificacion.controller.js';

const router = Router();

// Ruta para obtener la clasificación de un protocolo
router.get('/:id', obtenerClasificacion);

// Ruta para guardar o actualizar la clasificación
router.post('/', guardarClasificacion);

export default router;
