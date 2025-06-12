import express from 'express';
import {
  obtenerDatosGenerales,
  crearDatosGenerales,
  actualizarDatosGenerales
} from '../controllers/datos-generales.controller.js';

const router = express.Router();

router.get('/:id', obtenerDatosGenerales);             // Obtener por ID de protocolo
router.post('/', crearDatosGenerales);                 // Crear nuevo registro
router.put('/:id', actualizarDatosGenerales);          // Actualizar por ID de protocolo

export default router;
