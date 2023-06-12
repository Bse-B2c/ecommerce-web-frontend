import React, { FC } from 'react';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useAuthUser } from '@hooks/useAuthUser';
import { useGetTotalItemsQuery } from '@store/api/orderApi';

interface ShoppingCartButtonStateProps {}
interface ShoppingCartButtonDispatchProps {}

type ShoppingCartButtonProps = ShoppingCartButtonStateProps &
	ShoppingCartButtonDispatchProps;

const ShoppingCartButton: FC<ShoppingCartButtonProps> = () => {
	const { user } = useAuthUser();
	const { data } = useGetTotalItemsQuery(undefined, { skip: !user });
	return (
		<IconButton
			size="large"
			aria-label="account of current user"
			aria-controls="menu-appbar"
			aria-haspopup="true"
			href="/shopcart"
			color="inherit">
			<Badge badgeContent={data || 0} color="error">
				<ShoppingCart />
			</Badge>
		</IconButton>
	);
};

export default ShoppingCartButton;
