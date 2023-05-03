import React, { FC } from 'react';
import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	FormControl,
	Grid,
	Icon,
	IconButton,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import {
	ArrowLeft,
	ArrowRight,
	Delete,
	Pix,
	ConfirmationNumber,
	Home,
	ShoppingBasket,
	Payments,
} from '@mui/icons-material';
import Address from '@components/Address';
import Table from '@components/table/Table';
import { getBrazilCurrencyFormat } from '@utils/utilsProductPrice';

interface ShopCartStateProps {}
interface ShopCartDispatchProps {}

type ShopCartProps = ShopCartStateProps & ShopCartDispatchProps;

const ShopCart: FC<ShopCartProps> = () => {
	return (
		<Grid container item xs spacing={1}>
			<Grid container direction={'column'} item xs={7} spacing={2}>
				<Grid item xs>
					<Typography variant="h6">
						<Icon sx={{ mr: 1 }}>
							<Home />
						</Icon>
						Select your Adrress
					</Typography>
					<Address
						id={1}
						streetName={'Rua 1'}
						city={'Rio de Janeiro'}
						country={'Brasil'}
						apartment={'apt. 102'}
						houseNumber={15}
						zipCode={'21452415'}
						region={'Jardin'}
					/>
				</Grid>
				<Grid item xs>
					<Grid item xs>
						<Box
							sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
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
							data={[{ name: 'Product 1' }]}
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
							]}
							layout={['50%', '10%', '10%']}
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
											<Typography variant="body2">Discount: 30%</Typography>
										</Grid>
									</Grid>
								),
								quantity: () => (
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
											<IconButton size="small">
												<ArrowLeft />
											</IconButton>
											<TextField sx={{ width: 30 }} size="small" />
											<IconButton size="small">
												<ArrowRight />
											</IconButton>
										</FormControl>
									</Grid>
								),
								price: () => (
									<Grid item xs>
										{getBrazilCurrencyFormat(500)}
									</Grid>
								),
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
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
								{getBrazilCurrencyFormat(500)}
							</Typography>
						</Alert>
						<Divider sx={{ mt: 1, mb: 1 }} />
						<Typography variant="body2">Payment</Typography>
						<ToggleButtonGroup exclusive aria-label="payment">
							<ToggleButton value="PIX" aria-label="pix" size="small">
								<Pix />
								Pix
							</ToggleButton>
							<ToggleButton value="BOLETO" aria-label="boleto" size="small">
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
							size="small">
							Buy Products
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
};

export default ShopCart;
