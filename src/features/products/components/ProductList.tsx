import React, { FC } from 'react';
import { Grid, Pagination, useMediaQuery, useTheme } from '@mui/material';
import ProductCard from '@components/ProductCard';
import { Product } from '@features/Product';

interface ProductListStateProps {
	elements: Array<Product>;
	totalPage: number;
}
interface ProductListDispatchProps {
	onChangePage: (event: unknown, newPage: number) => void;
}

type ProductListProps = ProductListStateProps & ProductListDispatchProps;

const ProductList: FC<ProductListProps> = ({
	elements,
	totalPage,
	onChangePage,
}) => {
	const theme = useTheme();
	const match = useMediaQuery(theme.breakpoints.down('sm'));

	const content =
		Array.isArray(elements) && elements.length > 0
			? elements.map(({ name, price, discount }, index) => (
					<ProductCard
						key={`${name}-${index}`}
						id={1}
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
				md={10}
				lg={10}>
				{content}
			</Grid>
			<Grid container item xs justifyContent={'center'}>
				<Pagination count={totalPage} onChange={onChangePage} color="primary" />
			</Grid>
		</>
	);
};

export default ProductList;
