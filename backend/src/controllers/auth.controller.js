export const login = (req, res) => {
  const { usuario, password } = req.body;

  // Validación simulada (puedes cambiar por la lógica real con BD)
  if (usuario === 'IP-JFernández' && password === '1234') {
    return res.json({
      ok: true,
      usuario: { nombre_usuario: usuario },
      token: 'fake-jwt-token'
    });
  }

  return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
};
