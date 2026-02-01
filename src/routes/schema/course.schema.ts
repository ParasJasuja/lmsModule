import zod from 'zod';

export const createCourseSchema = zod.object({
	title: zod.string().trim(),
	description: zod.string().trim(),
	thumbnail: zod.string().trim(),
});
