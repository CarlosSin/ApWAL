// backend/src/routes/alternativas.routes.js
import { Router } from 'express';
import {
  guardarAlternativas,
  obtenerAlternativas,
  actualizarAlternativas
} from '../controllers/alternativas.controller.js';

const router = Router();

router.get('/:id', obtenerAlternativas);
router.post('/', guardarAlternativas);
router.put('/:id', actualizarAlternativas);

export default router;
