import React, { FC } from 'react';
import { FilteredProducts } from '@features/products';
import { Button, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface ProductsStateProps {}
interface ProductsDispatchProps {}

type ProductsProps = ProductsStateProps & ProductsDispatchProps;

const Products: FC<ProductsProps> = () => {
	return (
		<Grid container direction={'column'} spacing={1} item xs>
			<Grid item xs>
				<Button
					color={'secondary'}
					size={'small'}
					startIcon={<ArrowBack />}
					href={'/'}>
					Back
				</Button>
			</Grid>
			<FilteredProducts />
		</Grid>
	);
};

export default Products;
