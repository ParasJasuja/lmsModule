import { number } from 'zod';
import { pool } from '../config/database.js';
import { findByTitle } from '../dal/role.dal.js';
import { IFilterUser } from '../dal/types/user.types.js';
import { createUser, findAll, findByEmail } from '../dal/user.dal.js';
import { CustomError } from '../utils/error.util.js';
import { hashPassword } from '../utils/password.util.js';
import { ILoginPayload } from './types/auth.types.js';
import { IUser } from './types/user.types.js';
import {
	validate,
	validatePayload,
} from '../middlewares/validation.middleware.js';
import { filterSchema } from '../routes/schema/user.schema.js';

export default class UserService {
	public async create(payload: IUser) {
		// Check user exists
		const existingUser = await findByEmail(payload.email);
		if (existingUser) {
			throw new CustomError(409, 'User already exists', 'AlreadyExist');
		}
		// Check role exists
		const role = await findByTitle(payload.role);
		if (!role) {
			throw new CustomError(400, 'Invalid role');
		}

		// Hash Password
		const hashedPassword = await hashPassword(payload.password);

		// Create User
		const user = await createUser({
			email: payload.email,
			name: payload.name,
			password: hashedPassword,
			role_id: role.id,
		});

		return {
			id: user.id,
			email: user.email,
			role: role.title,
		};
	}

	public async getAll(filter: IFilterUser) {
		const parsedFilter = validatePayload(filterSchema, filter);
		return await findAll(parsedFilter);
	}
}
