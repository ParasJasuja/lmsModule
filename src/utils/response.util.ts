import { Response } from 'express';

export interface ApiResponse<T = unknown> {
	success: boolean;
	message: string;
	data?: T;
	error?: unknown;
}

export const successResponse = <T>(
	res: Response,
	status: number,
	message: string,
	data?: T,
): Response<ApiResponse<T>> => {
	return res.status(status).json({
		success: true,
		message,
		data,
	});
};

export const errorResponse = (
	res: Response,
	status: number,
	message: string,
	error?: unknown,
): Response<ApiResponse> => {
	return res.status(status).json({
		success: false,
		message,
		error,
	});
};
