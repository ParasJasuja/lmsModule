import pkg, { QueryConfigValues } from 'pg';
import { env } from './env.js';

const { Pool } = pkg;

export const pool = new Pool({
	host: env.database.host,
	port: env.database.port,
	database: env.database.name,
	user: env.database.user,
	password: env.database.password,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
	console.log('Database connected successfully');
});

pool.on('error', (err: any) => {
	console.error('Unexpected database error:', err);
	process.exit(-1);
});

// Query helper with error handling
export const query = async (text: string, params: QueryConfigValues<any>) => {
	const start = Date.now();
	try {
		const res = await pool.query(text, params);
		const duration = Date.now() - start;
		console.log('Executed query', { text, duration, rows: res.rowCount });
		return res;
	} catch (error) {
		console.error('Database query error:', error);
		throw error;
	}
};
