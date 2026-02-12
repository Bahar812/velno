const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'velno',
    waitForConnections: true,
    connectionLimit: 10,
};

let pool;

const ensureDatabase = async () => {
    const { database, ...baseConfig } = dbConfig;
    const adminPool = await mysql.createPool(baseConfig);
    await adminPool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await adminPool.end();
};

const ensureTables = async () => {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS landing_content (
            id INT PRIMARY KEY,
            content LONGTEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
    );
};

const initDatabase = async () => {
    await ensureDatabase();
    pool = await mysql.createPool(dbConfig);
    await ensureTables();
};

app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

app.get('/api/landing-content', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT content FROM landing_content WHERE id = 1 LIMIT 1');
        if (!rows.length) {
            return res.json({});
        }
        const raw = rows[0].content;
        const parsed = raw ? JSON.parse(raw) : {};
        return res.json(parsed);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to load content.' });
    }
});

app.put('/api/landing-content', async (req, res) => {
    try {
        const payload = req.body ?? {};
        const serialized = JSON.stringify(payload);
        await pool.query(
            'INSERT INTO landing_content (id, content) VALUES (1, ?) ON DUPLICATE KEY UPDATE content = VALUES(content)',
            [serialized]
        );
        return res.json({ ok: true });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to save content.' });
    }
});

const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

initDatabase()
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            // eslint-disable-next-line no-console
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to start server:', error);
        process.exit(1);
    });
