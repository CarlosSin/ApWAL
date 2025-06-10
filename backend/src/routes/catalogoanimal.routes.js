import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

console.log('Ruta catalogo animal lista');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM catalogoAnimal');
    res.json(rows);
  } catch (err) {
    console.error('❌ ERROR EN QUERY:', err);
    res.status(500).json({ error: 'Error al obtener catalogo Animal' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoanimalcatalogo = req.body;

    nuevoUsuario.no_decontrol_admin = 1111;// este mumero es probicional hasta que se tengo lo de el inicio de secion de forma correcta
    await pool.query('INSERT INTO catalogoAnimal SET ?', [nuevoanimalcatalogo]);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    console.error('Error al insertar animal en el catalogo Animal:', error);
    res.status(500).json({ error: 'Error al insertar animal en el catalogo Animal' });
  }
});

export default router;