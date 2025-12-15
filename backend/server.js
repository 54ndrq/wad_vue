require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'supersecretkey'; // ok for homework

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// Create tables automatically
(async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

    console.log('Tables ready');
})();

// JWT middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// SIGNUP
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO users(email, password) VALUES($1,$2) RETURNING id',
            [email, hashed]
        );

        const token = jwt.sign({ id: result.rows[0].id }, SECRET);
        res.json({ token });
    } catch {
        res.status(400).json({ message: 'User already exists' });
    }
});

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
    );

    if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.sendStatus(401);

    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ token });
});

// GET ALL POSTS
app.get('/posts', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
});

// GET ONE POST
app.get('/posts/:id', authenticateToken, async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM posts WHERE id=$1',
        [req.params.id]
    );
    res.json(result.rows[0]);
});

// ADD POST
app.post('/posts', authenticateToken, async (req, res) => {
    await pool.query(
        'INSERT INTO posts(body) VALUES($1)',
        [req.body.body]
    );
    res.sendStatus(201);
});

// UPDATE POST
app.put('/posts/:id', authenticateToken, async (req, res) => {
    await pool.query(
        'UPDATE posts SET body=$1 WHERE id=$2',
        [req.body.body, req.params.id]
    );
    res.sendStatus(200);
});

// DELETE POST
app.delete('/posts/:id', authenticateToken, async (req, res) => {
    await pool.query('DELETE FROM posts WHERE id=$1', [req.params.id]);
    res.sendStatus(200);
});

// DELETE ALL POSTS
app.delete('/posts', authenticateToken, async (req, res) => {
    await pool.query('DELETE FROM posts');
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Backend running on port 3000'));
