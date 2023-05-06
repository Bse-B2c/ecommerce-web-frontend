import React, { FC, useEffect } from 'react';
import {
	useCreateMyShoppingCartMutation,
	useGetUserShoppingCartQuery,
} from '@store/api/orderApi';

interface ShopCartStateProps {}
interface ShopcartDispatchProps {}

type ShopCartProps = ShopCartStateProps & ShopcartDispatchProps;

//	caso sim, exibir o shopping cart

const ShopCart: FC<ShopCartProps> = () => {
	const { error } = useGetUserShoppingCartQuery();
	const [createShoppingCart] = useCreateMyShoppingCartMutation();

	useEffect(() => {
		const apiError = error as any;
		if (apiError && apiError.status === 404) {
			createShoppingCart();
		}
	}, [error]);

	return <div />;
};

export default ShopCart;
