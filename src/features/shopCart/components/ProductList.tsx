import React, { FC } from 'react';
import {
	Box,
	Button,
	CardMedia,
	FormControl,
	Grid,
	Icon,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { Remove, Delete, ShoppingBasket, Add } from '@mui/icons-material';
import Table from '@components/table/Table';
import { getBrazilCurrencyFormat } from '@utils/utilsProductPrice';
import { Product } from '@features/Product';
import { ShoppingCartItem } from '@src/model/ShoppingCartItem';
import { useAddItem } from '@hooks/useAddItem';
import { useRemoveItemMutation } from '@store/api/orderApi';
import { ApiResponse } from '@src/model/ApiResponse';
import { showNotification } from '@store/notification/notificationSlice';
import { useDispatch } from 'react-redux';

interface ProductListStateProps {
	items: Array<ShoppingCartItem>;
}
interface ProductListDispatchProps {}

type ProductListProps = ProductListStateProps & ProductListDispatchProps;

const ProductList: FC<ProductListProps> = ({ items }) => {
	const dispatch = useDispatch();
	const { addProductInCart } = useAddItem();
	const [removeItem] = useRemoveItemMutation();

	const removeProductFromCart = async (productId: number) => {
		try {
			const response = await removeItem(productId);

			const { error } = response as unknown as { error: ApiResponse<null> };

			if (error) {
				dispatch(
					showNotification({
						type: 'error',
						message: error.error?.message || 'Something went wrong',
					})
				);
			} else {
				dispatch(
					showNotification({
						type: 'success',
						message: 'Product removed successfully',
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

	return (
		<Grid item xs>
			<Grid item xs>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mb: 4,
					}}>
					<Typography variant="h6">
						<Icon sx={{ mr: 1 }}>
							<ShoppingBasket />
						</Icon>
						Products
					</Typography>
					<Button
						variant="outlined"
						size="small"
						color="error"
						startIcon={<Delete />}>
						Remove All Products
					</Button>
				</Box>
				<Table
					data={items}
					fields={[
						{
							label: 'Product',
							key: 'product',
						},
						{
							label: 'Quantity',
							key: 'quantity',
						},
						{
							label: 'Price',
							key: 'price',
						},
						{
							label: 'Total',
							key: 'total',
						},
					]}
					layout={['50%', '10%', '10%']}
					scopedColumns={{
						product: ({ name, discount, image }: ShoppingCartItem) => {
							return (
								<Grid container item xs spacing={1}>
									<Grid item xs={4}>
										<CardMedia
											component="img"
											height={80}
											sx={{ objectFit: 'contain' }}
											image={image}
										/>
									</Grid>
									<Grid item xs={7}>
										<Typography variant="body1" fontWeight={800}>
											{name || ''}
										</Typography>
										{discount && (
											<Typography variant="body2">
												Discount: {discount}%
											</Typography>
										)}
									</Grid>
								</Grid>
							);
						},
						quantity: ({ quantity, productId, price }: ShoppingCartItem) => (
							<Grid
								container
								item
								xs
								alignItems="center"
								justifyContent="start">
								<FormControl
									sx={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center',
									}}>
									<IconButton
										size="small"
										onClick={async () => {
											await removeProductFromCart(productId);
										}}>
										<Remove />
									</IconButton>
									<TextField
										disabled={true}
										value={quantity}
										sx={{ width: 50 }}
										size="small"
									/>
									<IconButton
										size="small"
										onClick={async () => {
											await addProductInCart(false, { productId, price });
										}}>
										<Add />
									</IconButton>
								</FormControl>
							</Grid>
						),
						price: ({ discountedPrice }: ShoppingCartItem) => {
							return (
								<Grid item xs>
									{getBrazilCurrencyFormat(discountedPrice)}
								</Grid>
							);
						},
						total: ({ total }: ShoppingCartItem) => {
							return (
								<Grid item xs>
									{getBrazilCurrencyFormat(total)}
								</Grid>
							);
						},
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default ProductList;
