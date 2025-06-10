import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  obtenerRecursos,
  agregarRecurso,
  eliminarRecurso,
  obtenerTiposRecurso,
  actualizarRecurso
} from '../controllers/biblioteca.controller.js';

const router = express.Router();

// Configuración de multer para guardar archivos en /public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });


router.get('/ping', (req, res) => {
  res.send('pong');
});



// Rutas
router.get('/', obtenerRecursos);
router.post('/', upload.single('archivo'), agregarRecurso);
router.delete('/:id', eliminarRecurso);
router.get('/tipos', obtenerTiposRecurso);
router.put('/:id', upload.single('archivo'), actualizarRecurso);


export default router;
