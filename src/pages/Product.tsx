import React, { FC } from 'react';

interface ProductStateProps {}
interface ProductDispatchProps {}

type ProductProps = ProductStateProps & ProductDispatchProps;

const Product: FC<ProductProps> = () => {
	return <div>product</div>;
};

export default Product;
