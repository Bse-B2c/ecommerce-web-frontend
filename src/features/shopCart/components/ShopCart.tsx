import React, { FC, useEffect, useState } from 'react';
import { useGetUserShoppingCartQuery } from '@store/api/orderApi';
import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Icon,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { ConfirmationNumber, Payments, Pix } from '@mui/icons-material';
import {
	getBrazilCurrencyFormat,
	getDiscountPrice,
} from '@utils/utilsProductPrice';
import ProductList from '@features/shopCart/components/ProductList';
import { useGetOrderProductsQuery } from '@store/api/productApi';
import { Product } from '@features/Product';
import { Items } from '@src/model/ShoppingCart';
import { ShoppingCartItem } from '@src/model/ShoppingCartItem';
import ShoppingCartAddress from '@features/shopCart/components/ShoppingCartAddress';
import { Addresses } from '@features/authentication';
import { useGetMeAddressQuery } from '@store/api/accountApi';

interface ShopCartStateProps {}
interface ShopcartDispatchProps {}

type ShopCartProps = ShopCartStateProps & ShopcartDispatchProps;

const ShopCart: FC<ShopCartProps> = () => {
	const { data: userAddress } = useGetMeAddressQuery(
		{
			limit: 999,
			page: 0,
			sortOrder: 'DESC',
			orderBy: 'active',
		},
		{ refetchOnMountOrArgChange: true }
	);
	const { data: shoppingCart } = useGetUserShoppingCartQuery();
	const { data: products } = useGetOrderProductsQuery(
		shoppingCart?.cartItems?.map(item => item.productId) || [],
		{ skip: !shoppingCart?.cartItems || shoppingCart?.cartItems.length <= 0 }
	);
	const [address, setAddress] = useState<Addresses | null>(null);
	const calcDiscount = (price: number, product: Product | undefined) => {
		return product && product.discount !== null && product.discount.active
			? getDiscountPrice(price, product?.discount?.discountPercent)
			: price;
	};

	useEffect(() => {
		if (userAddress) {
			const address = userAddress.find(address => address.active);
			setAddress(address || null);
		}
	}, [userAddress]);

	const getItems = (
		items: Array<Items>,
		products: { [key: number]: Product }
	): {
		items: Array<ShoppingCartItem>;
		total: number;
	} => {
		const newItems = [];
		let total = 0;
		if (
			Array.isArray(items) &&
			items.length > 0 &&
			Object.keys(products).length > 0
		) {
			for (let i = 0; i < items.length; i++) {
				const currentItem = items[i];
				const product = products[currentItem.productId];
				const newPrice = calcDiscount(currentItem.price, product);
				const totalPrice = newPrice * currentItem.quantity;

				total += totalPrice;
				newItems.push({
					itemId: currentItem.id,
					productId: product.id,
					name: product.name,
					image: product.images[0] || '',
					discount: product.discount?.discountPercent || undefined,
					quantity: currentItem.quantity,
					price: currentItem.price,
					discountedPrice: newPrice,
					total: totalPrice,
				});
			}
		}

		return { items: newItems, total };
	};

	const { items, total } = getItems(
		shoppingCart?.cartItems || [],
		products || {}
	);

	return (
		<Grid container item xs spacing={1}>
			<Grid container direction={'column'} item xs={7} spacing={2}>
				<ShoppingCartAddress
					userId={shoppingCart?.userId}
					address={address}
					addresses={userAddress || []}
					onChangeAddress={(item: Addresses) => setAddress(item)}
				/>
				<ProductList items={items || []} />
			</Grid>
			<Grid item xs={4}>
				<Typography variant="h6">
					<Icon sx={{ mr: 1 }}>
						<Payments />
					</Icon>
					Order Summary
				</Typography>
				<Card variant="outlined">
					<CardContent>
						<Alert
							icon={false}
							sx={{
								width: '100%',
								'& .MuiAlert-message': {
									textAlign: 'center',
									width: 'inherit',
								},
							}}>
							<Typography variant="h5">Total</Typography>
							<Typography variant="h6">
								{getBrazilCurrencyFormat(total)}
							</Typography>
						</Alert>
						<Divider sx={{ mt: 1, mb: 1 }} />
						<Typography variant="body2">Payment</Typography>
						<ToggleButtonGroup exclusive aria-label="payment">
							<ToggleButton value="PIX" aria-label="pix" size="small">
								<Pix />
								Pix
							</ToggleButton>
							<ToggleButton value="BOLETO" aria-label="boleto" size="small">
								<ConfirmationNumber />
								Boleto
							</ToggleButton>
						</ToggleButtonGroup>
					</CardContent>
					<CardActions>
						<Button
							fullWidth
							color={'success'}
							variant="contained"
							disableElevation
							size="small">
							Buy Products
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
};

export default ShopCart;
