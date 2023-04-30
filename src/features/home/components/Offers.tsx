import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useFindOffersQuery } from '@store/api/productApi';
import ProductCard from '@components/ProductCard';

interface OffersStateProps {}
interface OffersDispatchProps {}

type OffersProps = OffersStateProps & OffersDispatchProps;

const Offers: FC<OffersProps> = () => {
	const { data } = useFindOffersQuery();
	return (
		<Grid item xs>
			<Grid item xs>
				<Typography variant="h6">Offers</Typography>{' '}
			</Grid>
			<Grid container item xs>
				{data?.map(({ id, name, price, inventory, discount, images }) => (
					<ProductCard
						id={id}
						name={name}
						price={price}
						averageRating={4}
						qtdReviews={100}
						mode={'vertical'}
						quantity={inventory ? inventory.quantity : 0}
						discount={discount || undefined}
						image={{
							src: images[0],
							description: '',
						}}
					/>
				))}
			</Grid>
		</Grid>
	);
};

export default Offers;
