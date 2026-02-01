import { findByEmail } from '../dal/user.dal.js';
import { UnauthorizedError } from '../utils/error.util.js';
import { signToken } from '../utils/jwt.util.js';
import { comparePassword } from '../utils/password.util.js';
import { ILoginPayload } from './types/auth.types.js';

export default class AuthService {
	public async login(payload: ILoginPayload) {
		// Check user exists
		const user = await findByEmail(payload.email);
		if (!user) throw new UnauthorizedError('Invalid Credentials');

		// Check creds
		const isCredValid = await comparePassword(payload.password, user.password);
		if (!isCredValid) throw new UnauthorizedError('Invalid Credentials');
		// Sign JWT token
		const token = signToken({
			userId: user.id,
			role: user.role,
		});

		return {
			user,
			token,
		};
	}
}
