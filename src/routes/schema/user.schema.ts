import zod from 'zod';

export const createUserSchema = zod.object({
	email: zod.email(),
	password: zod.string().min(8).max(16),
	name: zod.string().trim(),
	role: zod.enum(['student', 'admin']),
});

export const loginSchema = zod.object({
	email: zod.email(),
	password: zod.string().min(8).max(16),
});

export const filterSchema = zod.object({
	role: zod.string().optional(),
	search: zod
		.string()
		.regex(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed')
		.optional(),
	isActive: zod.boolean().optional(),
});
