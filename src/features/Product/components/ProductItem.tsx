import React, { FC } from 'react';
import {
	Button,
	CardMedia,
	Grid,
	Rating,
	Stack,
	Typography,
} from '@mui/material';
import { AddShoppingCart, ShoppingCart } from '@mui/icons-material';
import ProductReview from '@features/Product/components/ProductReview';

interface ProductItemStateProps {}
interface ProductItemDispatchProps {}

type ProductItemProps = ProductItemStateProps & ProductItemDispatchProps;

const ProductItem: FC<ProductItemProps> = () => {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					<CardMedia
						component="img"
						width={500}
						height={450}
						sx={{ objectFit: 'contain' }}
						src={
							'http://localhost:4700/img/7c55d990608940063a76619cd369c742-livro.jpg'
						}
					/>
				</Grid>
				<Grid container direction={'column'} spacing={2} item xs={7}>
					<Grid item>
						<Typography variant={'h6'}> Name of Product</Typography>
						<Grid container item alignItems={'center'}>
							<Rating size={'small'} name="read-only" value={5} readOnly />
							<Typography sx={{ ml: 1 }} variant="body2">
								(120)
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant={'subtitle1'}>
							<strong>Description</strong>
						</Typography>
						<Typography variant={'body1'}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
							unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
							quibusdam, aliquam dolore excepturi quae. Distinctio enim at
							eligendi perferendis in cum quibusdam sed quae, accusantium et
							aperiam?
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="body2" display="block" gutterBottom>
							<s>R$ 440</s>
						</Typography>
						<Typography variant="h6" fontSize={'2rem'} fontWeight={800}>
							R$ 200
						</Typography>
					</Grid>
					<Grid item>
						<Stack spacing={2} direction="row">
							<Button
								disableElevation
								color={'success'}
								variant={'contained'}
								startIcon={<ShoppingCart />}>
								Buy Now
							</Button>
							<Button
								color={'success'}
								variant={'outlined'}
								startIcon={<AddShoppingCart />}>
								Add to Card
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Grid>
			<ProductReview />
		</>
	);
};

export default ProductItem;
