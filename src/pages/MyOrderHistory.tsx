import React, { FC } from 'react';
import { Button, CardMedia, Chip, Grid, Typography } from '@mui/material';
import Table from '@components/table/Table';
import { v4 } from 'uuid';
import { getBrazilCurrencyFormat } from '@utils/utilsProductPrice';
import { StarHalf } from '@mui/icons-material';
import { formatDate } from '@utils/utilsDate';

interface MyOrderHistoryStateProps {}
interface MyOrderHistoryDispatchProps {}

type MyOrderHistoryProps = MyOrderHistoryStateProps &
	MyOrderHistoryDispatchProps;

const MyOrderHistory: FC<MyOrderHistoryProps> = () => {
	return (
		<Grid item container xs>
			<Table
				data={[]}
				fields={[
					{ label: 'Order Id', key: 'identifier' },
					{ label: 'Order Date', key: 'date' },
					{ label: 'Status', key: 'status' },
					{ label: 'Total', key: 'total' },
				]}
				layout={['30%', '10%', '10%', '20%', '20%']}
				scopedColumns={{
					identifier: () => <div>{v4()}</div>,
					date: () => <div>{formatDate(new Date().toISOString())}</div>,
					status: () => (
						<div>
							<Chip
								label="Paid"
								variant="outlined"
								size="small"
								color="success"
							/>
						</div>
					),
					total: () => <div>{getBrazilCurrencyFormat(400)}</div>,
				}}
				renderExpandableRow={() => (
					<Grid container direction="column" item xs spacing={2}>
						<Grid item xs>
							<Typography variant="body1" fontWeight={800}>
								Address
							</Typography>
							<Typography variant="body2">
								Street Name, House Number, Apartment
							</Typography>
							<Typography variant="body2">
								District, Zip Code, City - Country
							</Typography>
						</Grid>
						<Grid item xs>
							<Typography variant="body1" fontWeight={800}>
								Products
							</Typography>
							<Table
								data={[]}
								fields={[
									{ label: 'Product', key: 'product' },
									{ label: 'Total', key: 'total' },
									{ label: '', key: 'action' },
								]}
								layout={['70%', '10%', '15%']}
								scopedColumns={{
									product: () => (
										<Grid container item xs spacing={1}>
											<Grid item xs={4}>
												<CardMedia
													component="img"
													height={80}
													sx={{ objectFit: 'contain' }}
													image={
														'http://localhost:4700/img/7c55d990608940063a76619cd369c742-livro.jpg'
													}
												/>
											</Grid>
											<Grid item xs={7}>
												<Typography variant="body1" fontWeight={800}>
													Seja Foda!
												</Typography>
												<Typography variant="body2">Quantity: 3</Typography>
											</Grid>
										</Grid>
									),
									total: () => <div>{getBrazilCurrencyFormat(400)}</div>,
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
				)}
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

export default MyOrderHistory;
