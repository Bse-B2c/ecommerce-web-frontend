import React, { FC } from 'react';
import {
	Button,
	CardMedia,
	Chip,
	Grid,
	Rating,
	Stack,
	Typography,
} from '@mui/material';
import { AddShoppingCart, ShoppingCart } from '@mui/icons-material';
import { Discount } from '@features/Product/model/Discount';
import {
	getBrazilCurrencyFormat,
	getDiscountPrice,
} from '@utils/utilsProductPrice';
import { useAddItem } from '@hooks/useAddItem';

interface ProductInfoStateProps {
	id: number;
	name: string;
	description: string;
	discount?: Discount;
	price: number;
	image: string;
	ratingScale: number;
	qtdRatings: number;
}
interface ProductInfoDispatchProps {}

type ProductInfoProps = ProductInfoStateProps & ProductInfoDispatchProps;

const ProductInfo: FC<ProductInfoProps> = ({
	id,
	name,
	description,
	price,
	discount,
	image,
	ratingScale,
	qtdRatings,
}) => {
	const { addProductInCart } = useAddItem();
	const isDiscountActive = discount && discount.active;
	const formattedPrice = getBrazilCurrencyFormat(price);

	return (
		<Grid container spacing={2}>
			<Grid item xs={5}>
				<CardMedia
					component="img"
					width={500}
					height={450}
					sx={{ objectFit: 'contain' }}
					src={image}
				/>
			</Grid>
			<Grid container direction={'column'} spacing={2} item xs={7}>
				<Grid item>
					<Typography variant={'h6'}>
						{name}
						{isDiscountActive && (
							<Chip
								sx={{ p: 0, ml: 2 }}
								label={discount.name}
								size={'small'}
								color="primary"
							/>
						)}
					</Typography>
					<Grid container item alignItems={'center'}>
						<Rating
							size={'small'}
							name="read-only"
							value={ratingScale}
							readOnly
						/>
						<Typography sx={{ ml: 1 }} variant="body2">
							({qtdRatings})
						</Typography>
					</Grid>
				</Grid>
				<Grid item>
					<Typography variant={'subtitle1'}>
						<strong>Description</strong>
					</Typography>
					<Typography variant={'body1'}>{description}</Typography>
				</Grid>
				<Grid item>
					{isDiscountActive ? (
						<>
							<Typography variant="body2" display="block" gutterBottom>
								<s>{formattedPrice}</s>
							</Typography>
							<Typography variant="h6" fontSize={'2rem'} fontWeight={800}>
								{getBrazilCurrencyFormat(
									getDiscountPrice(price, discount.discountPercent)
								)}
							</Typography>
						</>
					) : (
						<Typography variant="h6" fontSize={'2rem'} fontWeight={800}>
							{formattedPrice}
						</Typography>
					)}
				</Grid>
				<Grid item>
					<Stack spacing={2} direction="row">
						<Button
							disableElevation
							color={'success'}
							variant={'contained'}
							onClick={async () => {
								await addProductInCart(true, {
									productId: id,
									price,
									discount: discount?.discountPercent,
								});
							}}
							startIcon={<ShoppingCart />}>
							Buy Now
						</Button>
						<Button
							color={'success'}
							variant={'outlined'}
							onClick={() =>
								addProductInCart(false, {
									productId: id,
									price,
									discount: discount?.discountPercent,
								})
							}
							startIcon={<AddShoppingCart />}>
							Add to Cart
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ProductInfo;
