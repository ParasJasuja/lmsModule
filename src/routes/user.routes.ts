import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createUserSchema } from './schema/user.schema.js';
import { createUserController } from '../controllers/user.controller.js';
import { getUserController } from '../controllers/user.controller.js';
import { rolesEnum } from '../utils/enums.util.js';

const router = Router();

router
	.route('/register')
	.post(
		isLoggedIn([rolesEnum.ADMIN]),
		validate(createUserSchema),
		createUserController,
	);
router.route('/user').get(isLoggedIn([rolesEnum.ADMIN]), getUserController);
// router.route('/user/:id').post(isLoggedIn('admin'), );

export default router;
