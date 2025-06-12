import { Router } from 'express';
import {
  obtenerDatosConfirmacion,
  enviarAlCICUAL
} from '../controllers/confirmacion.controller.js';
const router = Router();

router.get('/:id', obtenerDatosConfirmacion);
router.put('/enviar/:protocoloId', enviarAlCICUAL);
export default router;
