import { Router } from 'express';
import {
  guardarAgenteATA,
  obtenerAgentesATA,
  obtenerAgentePorAnimal
} from '../controllers/agente-ata.controller.js';

const router = Router();

// POST: Crear o actualizar un registro por animal en un protocolo
router.post('/', guardarAgenteATA);

// GET: Obtener todos los registros del protocolo
router.get('/:id', obtenerAgentesATA);

// GET: Obtener el registro específico de un animal dentro del protocolo
router.get('/:protocoloId/:animalId', obtenerAgentePorAnimal);

export default router;
