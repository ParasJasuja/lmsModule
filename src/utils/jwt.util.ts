import jwt, { Jwt, JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

const JWT_SECRET = env.jwt.secret;
const JWT_EXPIRES_IN = Number(env.jwt.expiresIn);

export interface IJwtPayload {
	userId: string;
	role: string;
}

export const signToken = (payload: IJwtPayload): string => {
	const options: SignOptions = {
		expiresIn: JWT_EXPIRES_IN,
	};
	return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): IJwtPayload => {
	return jwt.verify(token, JWT_SECRET) as IJwtPayload;
};
