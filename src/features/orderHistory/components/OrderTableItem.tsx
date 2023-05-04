import React from 'react';
import { Chip } from '@mui/material';
import { Order, PaymentStatus } from '@src/model/Order';
import { formatDate } from '@utils/utilsDate';
import { getBrazilCurrencyFormat } from '@utils/utilsProductPrice';

export const fields = [
	{ label: 'Order Id', key: 'identifier' },
	{ label: 'Order Date', key: 'date' },
	{ label: 'Status', key: 'status' },
	{ label: 'Total', key: 'total' },
];

const OrderStatusChip = {
	[PaymentStatus.PAID]: (
		<Chip label="Paid" variant="outlined" size="small" color="success" />
	),
	[PaymentStatus.CANCELLED]: (
		<Chip label="Cancelled" variant="outlined" size="small" color="error" />
	),
	[PaymentStatus.WAITING]: (
		<Chip label="Waiting" variant="outlined" size="small" color="warning" />
	),
};

export const getOrderTableItem = () => {
	return {
		identifier: (item: Order) => <div>{item.identifier}</div>,
		date: (item: Order) => <div>{formatDate(item.date)}</div>,
		status: (item: Order) => (
			<div>{OrderStatusChip[item.paymentDetails.status]}</div>
		),
		total: (item: Order) => <div>{getBrazilCurrencyFormat(item.total)}</div>,
	};
};
