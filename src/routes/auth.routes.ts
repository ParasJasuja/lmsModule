import { Router } from 'express';
import { loginController } from '../controllers/auth.controller.js';
import { getUserController } from '../controllers/user.controller.js';

const router = Router();

router.route('/auth/login').post(loginController);
router.route('/auth/me').post(getUserController);

export default router;
