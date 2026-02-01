import { Request, Response, NextFunction } from 'express';
import {
	CustomError,
	ICustomError,
	UnauthorizedError,
} from '../utils/error.util.js';
import { errorResponse } from '../utils/response.util.js';
import { ZodError } from 'zod';

export const globalErrorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
): Response => {
	// Zod validation Error
	if (err instanceof ZodError) {
		return errorResponse(
			res,
			400,
			'Validation failed',
			err.issues.map((issue) => ({
				path: issue.path.join('.'),
				message: issue.message,
			})),
		);
	}
	// Custom error
	if (err instanceof CustomError || err instanceof UnauthorizedError) {
		return errorResponse(res, err.status, err.message, {
			name: err.name,
		});
	}
	// Jwt error
	if (err instanceof Error) {
		if (err.name === 'TokenExpiredError') {
			return errorResponse(res, 401, 'Token expired');
		}

		if (err.name === 'JsonWebTokenError') {
			return errorResponse(res, 401, 'Invalid token');
		}
	}

	console.error(err);

	return errorResponse(
		res,
		500,
		'Something went wrong. Please try again later',
	);
};
