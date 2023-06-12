export interface Items {
	id: number;
	date: string;
	productId: number;
	price: number;
	quantity: number;
}

export interface ShoppingCart {
	id: number;
	total: number;
	userId: number;
	cartItems: Array<Items>;
}
