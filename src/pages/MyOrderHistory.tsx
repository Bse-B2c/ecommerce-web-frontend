import React, { FC } from 'react';
import OrderHistory from '@features/orderHistory/components/OrderHistory';

interface MyOrderHistoryStateProps {}
interface MyOrderHistoryDispatchProps {}

type MyOrderHistoryProps = MyOrderHistoryStateProps &
	MyOrderHistoryDispatchProps;

const MyOrderHistory: FC<MyOrderHistoryProps> = () => {
	return <OrderHistory />;
};

export default MyOrderHistory;
