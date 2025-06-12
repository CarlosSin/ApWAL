import { Router } from 'express';
import { login, recuperarContrasena } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Ruta pública para iniciar sesión
router.post('/login', login);

//Ruta pública para recuperar contraseña
router.post('/recuperar-contrasena', recuperarContrasena);

// Ruta protegida de prueba
router.get('/protegida', verifyToken, (req, res) => {
  res.json({
    ok: true,
    msg: 'Token válido. Acceso permitido.',
    usuario: req.user,
  });
});

export default router;
