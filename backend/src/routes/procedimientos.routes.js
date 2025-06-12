import { Router } from 'express';
import {
  guardarProcedimientos,
  obtenerProcedimientos,
  actualizarProcedimientos
} from '../controllers/procedimientos.controller.js';

const router = Router();


router.post('/', guardarProcedimientos);
router.get('/:id', obtenerProcedimientos);
router.put('/:id', actualizarProcedimientos);
export default router;
