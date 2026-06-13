import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 5432,
  database: process.env.DB_NAME     || 'contactsdb',
  user:     process.env.DB_USER     || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      email      VARCHAR(150) NOT NULL,
      message    TEXT         NOT NULL,
      created_at TIMESTAMPTZ  DEFAULT NOW()
    );
  `);
  console.log('✅ DB lista');
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
});

app.post('/contacts', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: 'name, email y message son obligatorios' });
  if (name.length > 100 || email.length > 150 || message.length > 1000)
    return res.status(400).json({ error: 'Campos demasiado largos' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Email inválido' });

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), email.trim(), message.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar contacto' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    res.json({ message: 'Contacto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Backend en http://localhost:${PORT}`));
}).catch(err => {
  console.error('❌ Error DB:', err.message);
  process.exit(1);
});
