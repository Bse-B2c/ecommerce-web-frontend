import React, { FC } from 'react';
import { Button, CardMedia, Grid, Typography } from '@mui/material';
import { Order, OrderItems } from '@src/model/Order';
import Table from '@components/table/Table';
import { getBrazilCurrencyFormat } from '@utils/utilsProductPrice';
import { StarHalf } from '@mui/icons-material';
import { useGetOrderProductsQuery } from '@store/api/productApi';
import { useGetOrderAddressQuery } from '@store/api/accountApi';
import {
	fields,
	getOrderTableItem,
} from '@features/orderHistory/components/OrderTableItem';

interface OrderListStateProps {
	data?: Array<Order>;
}
interface OrderListDispatchProps {}

type OrderListProps = OrderListStateProps & OrderListDispatchProps;

const OrderList: FC<OrderListProps> = ({ data }) => {
	const { data: products } = useGetOrderProductsQuery(
		data
			? data.reduce((ids: Array<number> = [], currentOrder) => {
					const productIds = currentOrder.orderItems.map(
						item => item.productId
					);

					ids.push(...productIds);

					return ids;
			  }, [])
			: [],
		{ skip: !data }
	);
	const { data: address } = useGetOrderAddressQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	return (
		<Grid item xs>
			<Table
				data={data || []}
				fields={fields}
				layout={['30%', '10%', '10%', '20%', '20%']}
				scopedColumns={getOrderTableItem()}
				renderExpandableRow={(item: Order) => {
					const userAddress = address ? address[item.addressId] : undefined;
					return (
						<Grid container direction="column" item xs spacing={2}>
							<Grid item xs>
								<Typography variant="body1" fontWeight={800}>
									Address
								</Typography>
								<Typography variant="body2">
									{userAddress?.streetName}, {userAddress?.houseNumber},{' '}
									{userAddress?.apartment}
								</Typography>
								<Typography variant="body2">
									{userAddress?.region}, {userAddress?.zipCode},{' '}
									{userAddress?.city} - {userAddress?.country}
								</Typography>
							</Grid>
							<Grid item xs>
								<Typography variant="body1" fontWeight={800}>
									Products
								</Typography>
								<Table
									data={item.orderItems || []}
									fields={[
										{ label: 'Product', key: 'product' },
										{ label: 'Total', key: 'total' },
										{ label: '', key: 'action' },
									]}
									layout={['70%', '10%', '15%']}
									scopedColumns={{
										product: (item: OrderItems) => {
											const product = products
												? products[item.productId]
												: undefined;
											return (
												<Grid container item xs spacing={1}>
													<Grid item xs={2}>
														<CardMedia
															component="img"
															height={80}
															sx={{ objectFit: 'contain' }}
															image={product?.images[0] || ''}
														/>
													</Grid>
													<Grid item xs={7}>
														<Typography variant="body1" fontWeight={800}>
															{product?.name || ''}
														</Typography>
														<Typography variant="body2">
															Quantity: {item.quantity}
														</Typography>
													</Grid>
												</Grid>
											);
										},
										total: (item: OrderItems) => (
											<div>{getBrazilCurrencyFormat(item.total)}</div>
										),
										action: () => (
											<div>
												<Button
													size="small"
													variant="outlined"
													startIcon={<StarHalf />}>
													Add Review
												</Button>
											</div>
										),
									}}
								/>
							</Grid>
						</Grid>
					);
				}}
				onPageChange={() => {}}
				onRowsPerPageChange={() => {}}
				paginationProps={{
					count: 10,
					page: 0,
					rowsPerPageOptions: [10, 20],
					rowsPerPage: 10,
				}}
			/>
		</Grid>
	);
};

export default OrderList;
