require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Pool} = require('pg');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 5432,
});

// Create tables automatically
(async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users
            (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts
            (
                id SERIAL PRIMARY KEY,
                body TEXT NOT NULL,
                date varchar(255),
                likes INT DEFAULT 0
            );
        `);

        console.log('Tables ready');

        const countResult = await pool.query('SELECT COUNT(*) FROM posts');
        if (parseInt(countResult.rows[0].count) === 0) {
            console.log('Posts table is empty. Seeding from JSON...');

            const jsonPath = path.join(__dirname, '../src/data/posts.json');

            if (fs.existsSync(jsonPath)) {
                const rawData = fs.readFileSync(jsonPath);
                const posts = JSON.parse(rawData);

                for (const post of posts) {
                    await pool.query(
                        'INSERT INTO posts (body, date, likes) VALUES ($1, $2, $3)',
                        [post.title, post.date, post.likes]
                    );
                }
                console.log('Database seeded successfully!');
            } else {
                console.log('posts.json not found at:', jsonPath);
            }
        }
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
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
    const email = req.body.email?.trim();
    const password = req.body.password;

    if (!email || !password) return res.status(400).json({message: 'Email and password required'});

    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users(email, password) VALUES($1,$2) RETURNING id',
            [email, hashed]
        );

        const token = jwt.sign({id: result.rows[0].id}, SECRET);
        res.status(201).json({token});
    } catch {
        res.status(400).json({message: 'User already exists'});
    }
});

// LOGIN
app.post('/login', async (req, res) => {
    const email = req.body.email?.trim();
    const password = req.body.password;

    if (!email || !password) return res.status(400).json({message: 'Email and password required'});

    try {
        const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (!result.rows.length) return res.status(401).json({message: 'Invalid credentials'});

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user.id}, SECRET);
        res.json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

// GET ALL POSTS
app.get('/posts', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

// GET ONE POST
app.get('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id=$1', [req.params.id]);
        if (!result.rows.length) return res.status(404).json({message: 'Post not found'});
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

// ADD POST
app.post('/posts', authenticateToken, async (req, res) => {
    const body = req.body.body?.trim();
    if (!body) return res.status(400).json({message: 'Post body required and cannot be empty'});

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    })

    const likes = 0;
    try {
        const result = await pool.query('INSERT INTO posts(body, date, likes) VALUES($1, $2, $3) RETURNING *', [body, currentDate, likes]);
        res.status(201).json({message: 'Post added', post: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

// UPDATE POST
app.put('/posts/:id', authenticateToken, async (req, res) => {
    const body = req.body.body?.trim();
    if (!body) return res.status(400).json({message: 'Post body required and cannot be empty'});

    try {
        const result = await pool.query(
            'UPDATE posts SET body=$1 WHERE id=$2 RETURNING *',
            [body, req.params.id]
        );
        if (!result.rows.length) return res.status(404).json({message: 'Post not found'});

        res.json({message: 'Post updated', post: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

// DELETE POST
app.delete('/posts/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM posts WHERE id=$1 RETURNING *', [req.params.id]);
        if (!result.rows.length) return res.status(404).json({message: 'Post not found'});

        res.json({message: 'Post deleted', post: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

// DELETE ALL POSTS
app.delete('/posts', authenticateToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM posts');
        res.json({message: 'All posts deleted'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

// Graceful shutdown
async function shutdown() {
    console.log('\nShutting down server...');
    try {
        await pool.end();
        console.log('Database connections closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing database connections:', err);
        process.exit(1);
    }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start server
app.listen(3000, () => console.log('Backend running on port 3000'));
