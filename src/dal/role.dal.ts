import { query } from '../config/database.js';

export const findByTitle = async (role: string) => {
	const result = await query('SELECT * FROM roles WHERE title = $1', [role]);
	return result.rows[0];
};
