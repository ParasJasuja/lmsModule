export interface ICreateUser {
	name: string;
	email: string;
	password: string;
	role_id: string;
}

export interface IDalUser {
	name: string;
	email: string;
	password: string;
	role_id: string;
	role: string;
	id: string;
	isActive: boolean;
	updatedAt?: string;
	createdAt?: string;
}

export interface IFilterUser {
	role?: string;
	isActive?: boolean;
	search?: string;
	page?: number;
}
