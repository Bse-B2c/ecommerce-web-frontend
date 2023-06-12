import React, { FC } from 'react';
import ShoppingCart from '@features/shopCart/components/ShopCart';

interface ShopCartStateProps {}
interface ShopCartDispatchProps {}

type ShopCartProps = ShopCartStateProps & ShopCartDispatchProps;

const ShopCart: FC<ShopCartProps> = () => {
	return <ShoppingCart />;
};

export default ShopCart;
