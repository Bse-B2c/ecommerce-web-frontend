export const getBrazilCurrencyFormat = (price: number) =>
	price.toLocaleString('pt-br', {
		style: 'currency',
		currency: 'BRL',
	});

export const getDiscountPrice = (price: number, discountPercent: number) =>
	price - (price * discountPercent) / 100;
