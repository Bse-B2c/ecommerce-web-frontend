import React, { FC } from 'react';
import { Grid } from '@mui/material';
import Table from '@components/Table';
import { v4 } from 'uuid';

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
					{ label: 'Order date', key: 'date' },
					{ label: 'Status', key: 'status' },
					{ label: 'Total', key: 'total' },
				]}
				layout={['20%', '10%', '10%', '20%', '20%']}
				scopedColumns={{
					identifier: () => <div>{v4()}</div>,
					date: () => <div>1</div>,
					status: () => <div>1</div>,
					total: () => <div>1</div>,
				}}
			/>
		</Grid>
	);
};

export default MyOrderHistory;
