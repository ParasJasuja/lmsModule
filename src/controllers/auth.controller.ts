import AuthService from '../services/auth.service.js';
import { CustomError } from '../utils/error.util.js';
import { asyncHandler } from '../utils/handler.util.js';
import { successResponse } from '../utils/response.util.js';

export const loginController = asyncHandler(async (req, res, next) => {
	try {
		const authService = new AuthService();
		const response = await authService.login(req.body);

		return successResponse(res, 200, 'Login successful', response);
	} catch (error) {
		next(error);
	}
});
