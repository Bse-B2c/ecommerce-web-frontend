import React, { FC } from 'react';
import {
	Box,
	Card,
	CardContent,
	Checkbox,
	FormControlLabel,
	Grid,
	Slider,
	Typography,
} from '@mui/material';
import ProductCard from '@components/ProductCard';

interface ProductsStateProps {}
interface ProductsDispatchProps {}

type ProductsProps = ProductsStateProps & ProductsDispatchProps;

const Products: FC<ProductsProps> = () => {
	return (
		<Grid container item xs spacing={2}>
			<Grid container direction={'column'} item xs={2}>
				<Card variant={'outlined'}>
					<CardContent>
						<Grid container direction={'column'} spacing={1} item xs>
							<Grid item xs>
								<Typography variant={'body1'}>
									<strong>Filter</strong>
								</Typography>
							</Grid>
							<Grid item xs>
								<Typography variant={'body1'}>Price</Typography>
								<Slider
									size={'small'}
									getAriaLabel={() => 'Minimum distance'}
									value={10}
									valueLabelDisplay="auto"
									disableSwap
								/>
							</Grid>
							<Grid container direction={'column'} item xs>
								<Typography variant={'body1'}>Categories</Typography>
								{['Value1', 'Value2'].map(category => (
									<FormControlLabel
										control={<Checkbox size={'small'} defaultChecked />}
										label={category}
									/>
								))}
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			<Grid
				container
				direction={'row'}
				alignItems={'start'}
				justifyContent={'start'}
				item
				xs={10}>
				{new Array(10).fill('value').map(() => (
					<Box sx={{ p: 1 }}>
						<ProductCard
							id={1}
							name={'Seja Foda!'}
							price={49.9}
							averageRating={4}
							qtdReviews={100}
							discount={{
								name: 'dsh',
								active: true,
								discountPercent: 30,
								id: 1,
							}}
							image={{
								src: 'http://localhost:4700/img/7c55d990608940063a76619cd369c742-livro.jpg',
								description: 'testegsdfdg',
							}}
						/>
					</Box>
				))}
			</Grid>
		</Grid>
	);
};

export default Products;
