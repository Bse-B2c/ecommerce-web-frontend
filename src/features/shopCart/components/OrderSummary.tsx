import React, { FC } from 'react';
import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Icon,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { ConfirmationNumber, Payments, Pix } from '@mui/icons-material';
import { getBrazilCurrencyFormat } from '@utils/utilsProductPrice';
import { PaymentType } from '@src/model/Order';

interface OrderSummaryStateProps {
	total: number;
	paymentType: number;
}
interface OrderSummaryDispatchProps {
	onChange: (value: number) => void;
	onSubmit: () => void;
}

type OrderSummaryProps = OrderSummaryStateProps & OrderSummaryDispatchProps;

const OrderSummary: FC<OrderSummaryProps> = ({
	total,
	paymentType,
	onChange,
	onSubmit,
}) => {
	return (
		<Grid item xs={4}>
			<Typography variant="h6">
				<Icon sx={{ mr: 1 }}>
					<Payments />
				</Icon>
				Order Summary
			</Typography>
			<Card variant="outlined">
				<CardContent>
					<Alert
						icon={false}
						sx={{
							width: '100%',
							'& .MuiAlert-message': {
								textAlign: 'center',
								width: 'inherit',
							},
						}}>
						<Typography variant="h5">Total</Typography>
						<Typography variant="h6">
							{getBrazilCurrencyFormat(total)}
						</Typography>
					</Alert>
					<Divider sx={{ mt: 1, mb: 1 }} />
					<Typography variant="body2">Payment</Typography>
					<ToggleButtonGroup
						value={paymentType}
						onChange={(event, value) => onChange(value)}
						exclusive
						aria-label="payment">
						<ToggleButton value={PaymentType.PIX} aria-label="pix" size="small">
							<Pix />
							Pix
						</ToggleButton>
						<ToggleButton
							value={PaymentType.BOLETO}
							aria-label="boleto"
							size="small">
							<ConfirmationNumber />
							Boleto
						</ToggleButton>
					</ToggleButtonGroup>
				</CardContent>
				<CardActions>
					<Button
						fullWidth
						color={'success'}
						variant="contained"
						disableElevation
						onClick={onSubmit}
						size="small">
						Buy Products
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default OrderSummary;
