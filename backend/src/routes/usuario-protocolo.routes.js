import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { obtenerUsuarioActualParaProtocolo } from '../controllers/usuario-protocolo.controller.js';

const router = express.Router();

router.get('/investigador', verifyToken, obtenerUsuarioActualParaProtocolo);

export default router;
