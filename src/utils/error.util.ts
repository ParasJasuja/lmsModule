export interface ICustomError extends Error {
	status?: number;
}

export class CustomError extends Error implements ICustomError {
	public status: number;

	/**
	 * @desc Takes status code and error message as params and raises an error
	 * @param code
	 * @param message
	 */
	constructor(code: number, message: string, name?: string) {
		super(message);
		this.name = name || 'CustomError';
		this.status = code;

		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export class UnauthorizedError extends Error implements ICustomError {
	public status: number;
	constructor(message: string) {
		super(message);
		this.name = 'Unauthorized';
		this.status = 401;

		Object.setPrototypeOf(this, new.target.prototype);
	}
}
