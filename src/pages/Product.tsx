import React, { FC } from 'react';
import { ProductItem } from '@features/Product';

interface ProductStateProps {}
interface ProductDispatchProps {}

type ProductProps = ProductStateProps & ProductDispatchProps;

const Product: FC<ProductProps> = () => {
	return <ProductItem />;
};

export default Product;
