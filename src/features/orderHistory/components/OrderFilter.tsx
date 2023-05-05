import React, { FC } from 'react';
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';

interface OrderFilterStateProps {
	status: number;
}
interface OrderFilterDispatchProps {
	onChange: (status: number) => void;
}

type OrderFilterProps = OrderFilterStateProps & OrderFilterDispatchProps;

const OrderFilter: FC<OrderFilterProps> = ({ status, onChange }) => {
	return (
		<Grid container item xs alignItems="center">
			<Typography variant="body1">Filter by</Typography>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<Select
					value={status}
					onChange={e => {
						onChange(Number(e.target.value) || 0);
					}}
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
	);
};

export default OrderFilter;
