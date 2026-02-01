import { Request, Response, NextFunction } from 'express';
import zod, { ZodError } from 'zod';
import { errorResponse } from '../utils/response.util.js';
import { asyncHandler } from '../utils/handler.util.js';
import { CustomError } from '../utils/error.util.js';

const formatZodError = (error: ZodError) => {
	return error.issues.map((issue) => ({
		path: issue.path.join('.'),
		message: issue.message,
	}));
};

export const validate = (schema: zod.ZodObject) =>
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		const body = req.body;
		const parsedBody = schema.safeParse(body);

		if (!parsedBody.success) {
			return errorResponse(
				res,
				400,
				'Validation failed',
				formatZodError(parsedBody.error),
			);
		}

		req.body = parsedBody.data;
		next();
	});

export const validatePayload = (
	schema: zod.ZodObject,
	payload: unknown,
): Record<string, unknown> => {
	const parsedBody = schema.safeParse(payload);

	if (!parsedBody.success) {
		throw new CustomError(400, 'Invalid params', 'InvalidRequest');
	}
	return parsedBody.data;
};
