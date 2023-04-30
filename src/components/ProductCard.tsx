import React, { FC } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	Link,
	Rating,
	Tooltip,
	Typography,
} from '@mui/material';
import {
	getBrazilCurrencyFormat,
	getDiscountPrice,
} from '@utils/utilsProductPrice';
import { Discount } from '@features/Product/model/Discount';
import { AddShoppingCart, ProductionQuantityLimits } from '@mui/icons-material';
import { minimizeTitle } from '@utils/utilsString';

interface ProductCardStateProps {
	id: number;
	name: string;
	price: number;
	discount?: Discount;
	image: { src: string; description: string };
	averageRating: number;
	qtdReviews: number;
	mode?: 'horizontal' | 'vertical';
	quantity: number;
}
interface ProductCardDispatchProps {}

type ProductCardProps = ProductCardStateProps & ProductCardDispatchProps;

const ProductCard: FC<ProductCardProps> = ({
	id,
	name,
	price,
	discount,
	image,
	qtdReviews,
	averageRating,
	quantity,
	mode = 'vertical',
}) => {
	const formattedPrice = getBrazilCurrencyFormat(price);
	const isDiscountActive = discount && discount.active;
	const url = `/product/${id}`;
	const title = minimizeTitle(name, 100);

	const contentButton =
		quantity === 0 ? (
			<Button
				color="success"
				variant="contained"
				disableElevation
				disabled
				fullWidth
				startIcon={<ProductionQuantityLimits />}>
				Unavailable
			</Button>
		) : (
			<Button
				color="success"
				variant="contained"
				disableElevation
				fullWidth
				startIcon={<AddShoppingCart />}>
				Add Cart
			</Button>
		);

	const contentPrice = isDiscountActive ? (
		<Box height={'50px'}>
			<Typography variant="body2" color={'text.secondary'} fontWeight={800}>
				<s>{formattedPrice}</s>
			</Typography>
			<Typography variant="h6" fontWeight={800}>
				{getBrazilCurrencyFormat(
					getDiscountPrice(price, discount.discountPercent)
				)}
			</Typography>
		</Box>
	) : (
		<Box height={'50px'}>
			<Typography variant="h6" fontWeight={800} sx={{ mt: '20px' }}>
				{formattedPrice}
			</Typography>
		</Box>
	);

	if (mode === 'horizontal') {
		return (
			<Card variant="outlined" sx={{ width: '100%', mb: 1, maxHeight: 376 }}>
				<CardContent>
					<Grid container direction={'row'} spacing={1} item xs>
						<Grid item xs={5}>
							<CardMedia
								component="img"
								height={150}
								width={'100%'}
								sx={{ objectFit: 'contain', p: 1 }}
								image={image.src}
							/>
						</Grid>
						<Grid item xs={7}>
							<Link href={url} color="inherit" underline="none">
								<Tooltip title={name} placement="right">
									<Typography variant="body2" fontWeight={800} gutterBottom>
										{title}
										{isDiscountActive && (
											<Chip
												sx={{ ml: 1 }}
												label={'30% off'}
												color={'primary'}
												size={'small'}
											/>
										)}
									</Typography>
								</Tooltip>
								<Box sx={{ display: 'flex', mb: 1 }}>
									<Rating
										size={'small'}
										name="read-only"
										value={averageRating}
										readOnly
									/>
									<Typography variant="body2" color={'text.secondary'}>
										({qtdReviews})
									</Typography>
								</Box>
								{contentPrice}
							</Link>
							{contentButton}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card variant="outlined" sx={{ width: 200, m: 1, maxHeight: 497 }}>
			<Box
				sx={{
					display: 'flex',
					p: 1,
					justifyContent: isDiscountActive ? 'space-between' : 'flex-end',
				}}>
				{isDiscountActive && (
					<Chip label={'30% off'} color={'primary'} size={'small'} />
				)}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
						mb: 1,
					}}>
					<Rating
						size={'small'}
						name="read-only"
						value={averageRating}
						readOnly
					/>
					<Typography variant="body2" color={'text.secondary'}>
						({qtdReviews})
					</Typography>
				</Box>
			</Box>
			<Link href={url} color="inherit" underline="none">
				<Tooltip title={image.description} placement="right">
					<CardMedia
						component="img"
						height={150}
						sx={{ objectFit: 'contain', p: 1 }}
						image={image.src}
					/>
				</Tooltip>
			</Link>
			<CardContent sx={{ height: 143 }}>
				<Link href={url} color="inherit" underline="none">
					<Tooltip title={name} placement="right">
						<Typography
							height={'41px'}
							variant="body2"
							fontWeight={800}
							gutterBottom>
							{title}
						</Typography>
					</Tooltip>
					{contentPrice}
				</Link>
			</CardContent>
			<CardActions>{contentButton}</CardActions>
		</Card>
	);
};

export default ProductCard;
