export interface Addresses {
	id: number;
	zipCode: string;
	streetName: string;
	houseNumber: number;
	apartment: string;
	city: string;
	region: string;
	country: string;
	active: boolean;
	user?: number;
}

export interface User {
	id: number;
	name: string;
	email: string;
	password?: string;
	phone: string;
	cpf: string;
	brithDate: string;
	createdAt: string;
	addresses: Array<Addresses>;
	roles: Array<number>;
}
