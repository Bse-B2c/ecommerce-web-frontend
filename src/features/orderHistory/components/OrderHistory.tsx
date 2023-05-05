import React, { FC, useState } from 'react';
import { Grid } from '@mui/material';
import { useFindOderHistoryQuery } from '@store/api/orderApi';
import OrderList from '@features/orderHistory/components/OrderList';
import OrderFilter from '@features/orderHistory/components/OrderFilter';

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
	const [status, setStatus] = useState<number>(0);
	const { data } = useFindOderHistoryQuery({
		...pagination,
		status: status === 0 ? undefined : status,
	});

	const onChangePage = (page: number) =>
		setPagination(prevState => ({ ...prevState, page }));

	const onChangeLimit = (limit: number) =>
		setPagination(prevState => ({ ...prevState, limit }));

	const onChangeStatus = (value: number) => setStatus(value);

	return (
		<Grid item container direction="column" xs spacing={1}>
			<OrderFilter status={status} onChange={onChangeStatus} />
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
