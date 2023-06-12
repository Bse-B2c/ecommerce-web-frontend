import React, { FC } from 'react';
import { FilteredProducts } from '@features/products';
import { Grid } from '@mui/material';

interface ProductsStateProps {}
interface ProductsDispatchProps {}

type ProductsProps = ProductsStateProps & ProductsDispatchProps;

const Products: FC<ProductsProps> = () => {
	return (
		<Grid container direction={'column'} spacing={1} item xs>
			<FilteredProducts />
		</Grid>
	);
};

export default Products;
