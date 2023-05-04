export interface PaymentDetails {
	status: number;
	provider: string;
	date: string;
	type: number;
}

export interface OrderItems {
	quantity: number;
	purchaseDate: string;
	productId: number;
	total: number;
}

export interface Order {
	total: number;
	userId: number;
	date: string;
	identifier: string;
	packageTracking: string;
	addressId: number;
	payment: PaymentDetails;
	items: Array<OrderItems>;
}
