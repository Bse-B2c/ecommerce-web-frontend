import React, { FC } from 'react';
import { Grid, Pagination, useMediaQuery, useTheme } from '@mui/material';
import ProductCard from '@components/ProductCard';
import { Product } from '@features/Product';

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
	const match = useMediaQuery(theme.breakpoints.down('sm'));

	const content =
		Array.isArray(data) && data.length > 0
			? data.map(({ id, name, price, discount }, index) => (
					<ProductCard
						key={`${name}-${index}`}
						id={id}
						mode={match ? 'horizontal' : undefined}
						name={name}
						price={price}
						averageRating={4}
						qtdReviews={100}
						discount={discount ?? undefined}
						image={{
							src: 'http://localhost:4700/img/7c55d990608940063a76619cd369c742-livro.jpg',
							description: 'testegsdfdg',
						}}
					/>
			  ))
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
