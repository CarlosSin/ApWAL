import { Router } from 'express';
import {
  obtenerDescripcionAnimal,
  crearDescripcionAnimal,
  actualizarDescripcionAnimal
} from '../controllers/descripcion-animal.controller.js';

const router = Router();

router.get('/:id', obtenerDescripcionAnimal);
router.post('/', crearDescripcionAnimal);
router.put('/:id', actualizarDescripcionAnimal);

export default router;
