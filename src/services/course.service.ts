import { createCourse } from '../dal/course.dal.js';
import { CustomError } from '../utils/error.util.js';
import { Request } from 'express';
import { ICourse } from './types/course.types.js';
export default class CourseService {
	public async create(userId: string, payload: ICourse) {
		// Create Course
		const course = await createCourse({
			title: payload.title,
			description: payload.description,
			thumbnail: payload.thumbnail,
			createdBy: userId,
		});

		return {
			id: course.id,
			title: course.title,
			description: course.description,
		};
	}
}
