export interface ShoppingCartItem {
	itemId: number;
	productId: number;
	name: string;
	image: string;
	discount?: number;
	price: number;
	total: number;
	quantity: number;
	discountedPrice: number;
}
