import AuthService from '../services/auth.service.js';
import UserService from '../services/user.service.js';
import { CustomError } from '../utils/error.util.js';
import { asyncHandler } from '../utils/handler.util.js';
import { successResponse } from '../utils/response.util.js';

export const createUserController = asyncHandler(async (req, res) => {
	const useService = new UserService();
	const user = await useService.create(req.body);
	return successResponse(res, 201, 'User created successfully', user);
});

export const getUserController = asyncHandler(async (req, res, next) => {
	try {
		if (!req.user) throw new CustomError(400, 'User not found');
		return successResponse(res, 200, 'Found', req.user);
	} catch (error) {
		next(error);
	}
});

export const getUsersController = asyncHandler(async (req, res) => {
	const query = req.query;
	const useService = new UserService();
	const users = await useService.getAll(query);
	return successResponse(res, 200, 'Found', users);
});

export const getOneUserController = asyncHandler(async (req, res) => {
	const useService = new UserService();
	const user = await useService.create(req.body);
	return successResponse(res, 200, 'Found', user);
});

const updateUserController = asyncHandler(async (req, res) => {});
