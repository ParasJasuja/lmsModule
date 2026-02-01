import dotenv from 'dotenv';
import { env } from './config/env.js';
import server from './app.js';
import { pool } from './config/database.js';

const PORT = env.port;

dotenv.config({
	path: './.env',
});

async function start() {
	await pool.query('SELECT 1'); // health check
	server.listen(PORT, () => console.log('Server running on port:', PORT));
}

start();
