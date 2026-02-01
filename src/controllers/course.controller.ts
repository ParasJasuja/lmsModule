import CourseService from '../services/course.service.js';
import { CustomError } from '../utils/error.util.js';
import { asyncHandler } from '../utils/handler.util.js';
import { successResponse } from '../utils/response.util.js';

export const createCourseController = asyncHandler(async (req, res, next) => {
	try {
		// Check user
		if (!req.user) throw new CustomError(400, 'Invaild user');
		// Create Course
		const courseService = new CourseService();
		const user = await courseService.create(req.user.id, req.body);
		// return response
		return successResponse(res, 201, 'User created successfully', user);
	} catch (error) {
		next(error);
	}
});
