import zod from 'zod';

export const loginSchema = zod.object({
	email: zod.email(),
	password: zod.string().min(8).max(16),
});

export const forgotPasSchema = zod.object({
	email: zod.email(),
});
