import React, { FC, useState } from 'react';
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useFindOderHistoryQuery } from '@store/api/orderApi';
import OrderList from '@features/orderHistory/components/OrderList';

interface OrderHistoryStateProps {}
interface OrderHistoryDispatchProps {}

type OrderHistoryProps = OrderHistoryStateProps & OrderHistoryDispatchProps;

const OrderHistory: FC<OrderHistoryProps> = () => {
	const [pagination, setPagination] = useState({
		page: 0,
		limit: 10,
		sortOrder: 'DESC',
		orderBy: 'date',
	});
	const { data } = useFindOderHistoryQuery(pagination);

	const onChangePage = (page: number) =>
		setPagination(prevState => ({ ...prevState, page }));

	const onChangeLimit = (limit: number) =>
		setPagination(prevState => ({ ...prevState, limit }));

	return (
		<Grid item container direction="column" xs spacing={1}>
			<Grid container item xs alignItems="center">
				<Typography variant="body1">Filter by</Typography>
				<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
					<Select
						value={0}
						//	onChange={handleChange}
						displayEmpty>
						<MenuItem value={0}>
							<em>All</em>
						</MenuItem>
						<MenuItem value={10}>Paid</MenuItem>
						<MenuItem value={20}>Cancelled</MenuItem>
						<MenuItem value={30}>Waiting</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<OrderList
				data={data}
				page={pagination.page}
				limit={pagination.limit}
				onChangePage={onChangePage}
				onChangeLimit={onChangeLimit}
			/>
		</Grid>
	);
};

export default OrderHistory;
