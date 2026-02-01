import type {
	Request,
	Response,
	NextFunction,
	RequestHandler,
	ErrorRequestHandler,
} from 'express';

export const asyncHandler =
	(
		controller: (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<any>,
	): RequestHandler =>
	(req, res, next) => {
		Promise.resolve(controller(req, res, next)).catch(next);
	};
