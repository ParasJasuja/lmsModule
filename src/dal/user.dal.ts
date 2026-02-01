import { query } from '../config/database.js';
import { env } from '../config/env.js';
import { ICreateUser, IDalUser, IFilterUser } from './types/user.types.js';

export const findByEmail = async (email: string): Promise<IDalUser> => {
	const result = await query(
		'SELECT u.id, name, email, password, r.title as role, u.is_active as isActive FROM users u join roles r on u.role_id = r.id  WHERE email = $1 AND is_active = true',
		[email],
	);
	return result.rows[0];
};

export const findById = async (id: string): Promise<IDalUser> => {
	const result = await query(
		'SELECT u.id, email, name, role_id, password, r.title as role, u.is_active as isActive, u.created_at as createdAt, u.updated_at as updatedAt FROM users u join roles r on u.role_id = r.id WHERE u.id = $1',
		[id],
	);
	return result.rows[0];
};

const addFilters = (
	sql: string,
	filters: IFilterUser,
): [string, number, Array<string | boolean | number>] => {
	const params = [];
	let paramCount = 0;

	if (filters.role) {
		paramCount++;
		sql += ` AND role = $${paramCount}`;
		params.push(filters.role);
	}

	if (filters.isActive !== undefined) {
		paramCount++;
		sql += ` AND is_active = $${paramCount}`;
		params.push(filters.isActive);
	}

	if (filters.search) {
		paramCount++;
		sql += ` AND (name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
		params.push(`%${filters.search}%`);
	}

	return [sql, paramCount, params];
};

export const findAll = async (filters: IFilterUser) => {
	const limit = env.paginationLimit;
	const page = filters.page ?? 1;
	const offset = (page - 1) * limit;

	let sql =
		'SELECT u.id, email, name, role_id, password, r.title as role, u.is_active as isActive, u.created_at as createdAt, u.updated_at as updatedAt FROM users u join roles r on u.role_id = r.id WHERE 1=1';

	let paramCount = 0;
	let params = [];
	[sql, paramCount, params] = addFilters(sql, filters);

	paramCount++;
	sql += ` ORDER BY u.created_at DESC LIMIT $${paramCount}`;
	params.push(limit);

	paramCount++;
	sql += ` OFFSET $${paramCount}`;
	params.push(offset);

	const result = await query(sql, params);
	return result.rows;
};

export const getCount = async (filters: IFilterUser) => {
	let sql =
		'SELECT count(*) FROM users u join roles r on u.role_id = r.id WHERE 1=1';
	let paramCount = 0;
	let params = [];

	[sql, paramCount, params] = addFilters(sql, filters);

	const result = await query(sql, params);
	return result.rows;
};

export const createUser = async (userData: ICreateUser) => {
	const { email, password, name, role_id } = userData;

	const result = await query(
		`INSERT INTO users (email, password, name, role_id) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, email, name, role, created_at`,
		[email, password, name, role_id],
	);
	return result.rows[0];
};
