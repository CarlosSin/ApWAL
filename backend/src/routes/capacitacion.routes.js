import express from 'express';
import multer from 'multer';
import path from 'path';
import { guardarCapacitacion, obtenerCapacitacion } from '../controllers/capacitacion.controller.js';

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/capacitacion/');
  },
 filename: (req, file, cb) => {
  const suffix = file.fieldname === 'archivo_investigador' ? '_inv' : '_supl';
  const protocoloId = req.body.ID_registro_protocolo || 'desconocido';
  const timestamp = Date.now();
  const name = `archivo${suffix}_${timestamp}.pdf`;
  cb(null, name);
}
});
const upload = multer({ storage });

// ✅ Asegúrate de usar upload.fields
router.post('/', upload.fields([
  { name: 'archivo_investigador', maxCount: 1 },
  { name: 'archivo_suplente', maxCount: 1 }
]), guardarCapacitacion);

router.get('/:protocoloId', obtenerCapacitacion);

export default router;
