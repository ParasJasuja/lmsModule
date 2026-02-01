import { query } from '../config/database.js';
import { ICreateCourse } from './types/course.types.js';

export const createCourse = async (userData: ICreateCourse) => {
	const { title, description, createdBy, thumbnail } = userData;

	const result = await query(
		`INSERT INTO users (title, description, created_by, thumbnail_url) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, title, description, thumbnail_url, created_at`,
		[title, description, createdBy, thumbnail],
	);
	return result.rows[0];
};

export const findAllCourses = async () => {
	let sql =
		'SELECT c.id, title, description, thumbnail_url, email FROM courses c join users u on c.user_id = u.id WHERE 1=1';

	const result = await query(sql, []);
	return result.rows;
};
