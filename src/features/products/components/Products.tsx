import React, { FC } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import Filters from '@features/products/components/Filters';
import ProductList from '@features/products/components/ProductList';
import { useSearchParams } from 'react-router-dom';
import { useFindProductsQuery } from '@store/api/productApi';

interface ProductsStateProps {}
interface ProductsDispatchProps {}

type ProductsProps = ProductsStateProps & ProductsDispatchProps;

const Products: FC<ProductsProps> = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const {
		orderBy = 'price',
		sortOrder = 'ASC',
		page = 1,
		limit = 10,
		categories,
		...search
	} = Object.fromEntries([...searchParams]);
	const { data, isLoading } = useFindProductsQuery({
		page: +page - 1 || 0,
		limit: +limit || 10,
		orderBy,
		sortOrder,
		categories,
		...search,
	});

	const onChangeParams = (key: string, value: string) =>
		setSearchParams(prev => {
			return { ...Object.fromEntries([...prev]), [key]: value };
		});

	return (
		<Grid container item xs spacing={2}>
			<Filters
				orderBy={orderBy}
				sortOrder={sortOrder}
				categories={
					categories === '' ? [] : categories?.split(',').map(e => +e) || []
				}
				onChange={onChangeParams}
			/>
			{isLoading ? (
				<Grid
					container
					direction={'row'}
					alignItems={'center'}
					justifyContent={'center'}
					item
					xs={8}
					md={9}
					lg={10}>
					<CircularProgress size={'2rem'} />
				</Grid>
			) : (
				<ProductList
					data={data || []}
					page={+page || 0}
					totalPage={20}
					onChangePage={(e, page) => {
						onChangeParams('page', page.toString());
					}}
				/>
			)}
		</Grid>
	);
};

export default Products;
