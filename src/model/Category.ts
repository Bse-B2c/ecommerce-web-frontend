export interface Category {
	id: number;
	name: string;
	description: string;
	children: Array<Category>;
}
