import React, { FC } from 'react';
import { ProductItem } from '@features/Product';
import { Button, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ProductStateProps {}
interface ProductDispatchProps {}

type ProductProps = ProductStateProps & ProductDispatchProps;

const Product: FC<ProductProps> = () => {
	const navigate = useNavigate();

	return (
		<Grid container direction={'column'} spacing={2} item xs>
			<Grid item xs>
				<Button
					color={'secondary'}
					size={'small'}
					startIcon={<ArrowBack />}
					onClick={() => navigate(-1)}>
					Back
				</Button>
			</Grid>
			<Grid item xs>
				<ProductItem />
			</Grid>
		</Grid>
	);
};

export default Product;
