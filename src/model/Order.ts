export enum PaymentStatus {
	PAID = 10,
	CANCELLED = 20,
	WAITING = 30,
}

export enum PaymentType {
	BOLETO = 10,
	PIX = 20,
}

export interface PaymentDetails {
	status: PaymentStatus;
	provider: string;
	date: string;
	type: number;
}

export interface OrderItems {
	quantity: number;
	purchaseDate: string;
	productId: number;
	price: number;
	total: number;
}

export interface Order {
	total: number;
	userId: number;
	date: string;
	identifier: string;
	packageTracking: string;
	addressId: number;
	paymentDetails: PaymentDetails;
	orderItems: Array<OrderItems>;
}
