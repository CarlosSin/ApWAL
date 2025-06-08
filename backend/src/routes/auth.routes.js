import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Ruta pública para iniciar sesión
router.post('/login', login);

// Ruta protegida de prueba
router.get('/protegida', verifyToken, (req, res) => {
  res.json({
    ok: true,
    msg: 'Token válido. Acceso permitido.',
    usuario: req.user,
  });
});

export default router;
