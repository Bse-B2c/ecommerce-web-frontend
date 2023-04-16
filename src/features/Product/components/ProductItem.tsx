import React, { FC } from 'react';
import ProductReview from '@features/Product/components/ProductReview';
import { useGetProductQuery } from '@store/api/productApi';
import {
	useGetAverageProductReviewQuery,
	useGetScalePercentageQuery,
} from '@store/api/ratingApi';
import { useParams } from 'react-router-dom';
import ProductSpecification from '@features/Product/components/ProductSpecification';
import ProductInfo from '@features/Product/components/ProductInfo';

interface ProductItemStateProps {}
interface ProductItemDispatchProps {}

type ProductItemProps = ProductItemStateProps & ProductItemDispatchProps;

const ProductItem: FC<ProductItemProps> = () => {
	const params = useParams();
	const id = params.id ? +params.id : -1;
	const { data: product } = useGetProductQuery(id);
	const { data: ratingScale } = useGetAverageProductReviewQuery(id);
	const { data: averageRating } = useGetScalePercentageQuery(id);

	return (
		<>
			<ProductInfo
				name={product?.name ?? 'Unknown'}
				description={product?.description ?? 'Unknown'}
				price={product?.price || 0}
				discount={product?.discount ?? undefined}
				image={product?.images[0] || ''}
				ratingScale={ratingScale || 0}
				qtdRatings={averageRating?.total || 0}
			/>
			<ProductSpecification specifications={product?.specifications} />
			<ProductReview
				productId={id}
				qtdRatings={averageRating?.total || 0}
				ratingScale={ratingScale || 0}
				percentages={averageRating?.percentages || []}
			/>
		</>
	);
};

export default ProductItem;
