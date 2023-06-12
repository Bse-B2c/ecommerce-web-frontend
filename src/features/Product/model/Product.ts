import { Discount } from '@features/Product/model/Discount';
import { Inventory } from '@features/Product/model/Inventory';
import { Specification } from '@features/Product/model/Specification';

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	createdAt: string;
	releaseDate: string;
	categoryId: number;
	images: Array<string>;
	discount: Discount | null;
	inventory: Inventory | null;
	specifications: Array<Specification>;
}
