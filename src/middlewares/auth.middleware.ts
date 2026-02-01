import { asyncHandler } from '../utils/handler.util.js';
import { UnauthorizedError } from '../utils/error.util.js';
import { verifyToken } from '../utils/jwt.util.js';
import { findById } from '../dal/user.dal.js';

export const isLoggedIn = (role: string[]) =>
	asyncHandler(async (req, res, next) => {
		console.log(role);
		try {
			// Check token
			const token =
				req.cookies?.token ||
				req.body.token ||
				req.header('Authorization')?.replace('Bearer ', '');
			if (!token) throw new UnauthorizedError('Invalid token');
			// Authorize
			const decodedToken = verifyToken(token);
			const user = await findById(decodedToken.userId);
			if (!user || user.role !== decodedToken.role || !role.includes(user.role))
				throw new UnauthorizedError('Not authorized');
			// Add user to req
			req.user = user;
			next();
		} catch (error) {
			next(error);
		}
	});
