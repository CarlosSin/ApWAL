import express from 'express';
import { getSaludOcupacional, guardarSaludOcupacional } from '../controllers/salud-ocupacional.controller.js';

const router = express.Router();

router.get('/protocolo/:protocoloId', getSaludOcupacional);
router.post('/', guardarSaludOcupacional);

export default router;
