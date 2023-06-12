import React, { FC, useEffect, useState } from 'react';
import {
	useCreateOrderDetailsMutation,
	useGetUserShoppingCartQuery,
} from '@store/api/orderApi';
import { Grid } from '@mui/material';
import { getDiscountPrice } from '@utils/utilsProductPrice';
import ProductList from '@features/shopCart/components/ProductList';
import { useGetOrderProductsQuery } from '@store/api/productApi';
import { Product } from '@features/Product';
import { Items } from '@src/model/ShoppingCart';
import { ShoppingCartItem } from '@src/model/ShoppingCartItem';
import ShoppingCartAddress from '@features/shopCart/components/ShoppingCartAddress';
import { Addresses } from '@features/authentication';
import { useGetMeAddressQuery } from '@store/api/accountApi';
import OrderSummary from '@features/shopCart/components/OrderSummary';
import { PaymentType } from '@src/model/Order';
import { useDispatch } from 'react-redux';
import { showNotification } from '@store/notification/notificationSlice';
import { ApiResponse } from '@src/model/ApiResponse';
import { useNavigate } from 'react-router-dom';

interface ShopCartStateProps {}
interface ShopcartDispatchProps {}

type ShopCartProps = ShopCartStateProps & ShopcartDispatchProps;

const ShopCart: FC<ShopCartProps> = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [createOrderDetails] = useCreateOrderDetailsMutation();
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
	const [paymentType, setPaymentType] = useState<number>(PaymentType.PIX);

	useEffect(() => {
		if (userAddress) {
			const address = userAddress.find(address => address.active);
			setAddress(address || null);
		}
	}, [userAddress]);

	const calcDiscount = (price: number, product: Product | undefined) => {
		return product && product.discount !== null && product.discount.active
			? getDiscountPrice(price, product?.discount?.discountPercent)
			: price;
	};

	const onChange = (value: number) => {
		setPaymentType(value);
	};

	const onSubmit = () => {
		try {
			if (address && paymentType) {
				createOrderDetails({
					paymentType,
					shoppingCartId: shoppingCart?.id || -1,
					addressId: address.id,
				});

				dispatch(
					showNotification({
						type: 'success',
						message: 'Order created. Waiting payment',
					})
				);
				navigate('/');
			} else {
				dispatch(
					showNotification({
						type: 'warning',
						message: "You can't buy products without an address",
					})
				);
			}
		} catch (e) {
			const error = e as { data: ApiResponse<null> };
			const message = error?.data?.error
				? error.data.error.message
				: 'Something went wrong';

			dispatch(showNotification({ type: 'error', message }));
		}
	};

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
			<OrderSummary
				total={total}
				paymentType={paymentType}
				onChange={onChange}
				onSubmit={onSubmit}
			/>
		</Grid>
	);
};

export default ShopCart;
