import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { rolesEnum } from '../utils/enums.util.js';
import { createCourseSchema } from './schema/course.schema.js';

const router = Router();

router.route('/course').get(() => {});
router
	.route('/course')
	.post(isLoggedIn([rolesEnum.ADMIN]), validate(createCourseSchema));

export default router;
