import { IDalUser } from '../dal/types/user.types.ts';

declare global {
	namespace Express {
		interface Request {
			user?: IDalUser;
		}
	}
}
