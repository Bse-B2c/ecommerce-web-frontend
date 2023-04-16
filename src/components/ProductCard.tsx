import React, { FC } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
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
import { AddShoppingCart } from '@mui/icons-material';

interface ProductCardStateProps {
	id: number;
	name: string;
	price: number;
	discount?: Discount;
	image: { src: string; description: string };
	averageRating: number;
	qtdReviews: number;
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
}) => {
	const formattedPrice = getBrazilCurrencyFormat(price);
	const isDiscountActive = discount && discount.active;
	const url = `/product/${id}`;
	return (
		<Card variant="outlined" sx={{ width: 220 }}>
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
			<CardContent>
				<Link href={url} color="inherit" underline="none">
					<Tooltip title={name} placement="right">
						<Typography variant="h6" gutterBottom>
							{name}
						</Typography>
					</Tooltip>
					{isDiscountActive ? (
						<>
							<Typography
								variant="body2"
								color={'text.secondary'}
								fontWeight={800}>
								<s>{formattedPrice}</s>
							</Typography>
							<Typography variant="h5" fontWeight={800}>
								{getBrazilCurrencyFormat(
									getDiscountPrice(price, discount.discountPercent)
								)}
							</Typography>
						</>
					) : (
						<Typography variant="h5" fontWeight={800}>
							{formattedPrice}
						</Typography>
					)}
				</Link>
			</CardContent>
			<CardActions>
				<Button
					color="success"
					variant="contained"
					disableElevation
					fullWidth
					startIcon={<AddShoppingCart />}>
					Add Cart
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
