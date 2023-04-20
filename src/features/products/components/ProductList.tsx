import React, { FC } from 'react';
import { Grid, Pagination, useMediaQuery, useTheme } from '@mui/material';
import ProductCard from '@components/ProductCard';
import { Product } from '@features/Product';
import { useGetRatingAveragesQuery } from '@store/api/ratingApi';

interface ProductListStateProps {
	data: Array<Product>;
	totalPage: number;
	page: number;
}
interface ProductListDispatchProps {
	onChangePage: (event: unknown, newPage: number) => void;
}

type ProductListProps = ProductListStateProps & ProductListDispatchProps;

const ProductList: FC<ProductListProps> = ({
	data,
	totalPage,
	page,
	onChangePage,
}) => {
	const theme = useTheme();
	const smBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
	const { data: rating } = useGetRatingAveragesQuery(
		data.map(({ id }) => id) || []
	);

	const content =
		Array.isArray(data) && data.length > 0
			? data.map(({ id, name, price, discount, images, inventory }, index) => {
					const ratingAverage = rating ? rating[id] : undefined;
					return (
						<ProductCard
							key={`${name}-${index}`}
							id={id}
							mode={smBreakpoint ? 'horizontal' : undefined}
							name={name}
							price={price}
							averageRating={ratingAverage?.average || 0}
							qtdReviews={ratingAverage?.total || 0}
							discount={discount ?? undefined}
							quantity={inventory?.quantity || 0}
							image={{
								src: images[0],
								description: '',
							}}
						/>
					);
			  })
			: null;
	return (
		<>
			<Grid
				container
				direction={'row'}
				alignItems={'start'}
				justifyContent={'start'}
				item
				xs={8}
				md={9}
				lg={10}>
				{content}
			</Grid>
			<Grid container item xs justifyContent={'center'}>
				<Pagination
					count={totalPage}
					page={page}
					onChange={onChangePage}
					color="primary"
				/>
			</Grid>
		</>
	);
};

export default ProductList;
