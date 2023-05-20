import React, { FC } from 'react';
import { Grid, Rating, Typography } from '@mui/material';
import PercentageReviews from '@features/Product/components/PercentageReviews';
import { ScalePercentage } from '@src/model/StatsRating';
import ReviewList from '@features/Product/components/ReviewList';

interface ProductReviewStateProps {
	productId: number;
	qtdRatings: number;
	ratingScale: number;
	percentages: Array<ScalePercentage>;
}
interface ProductReviewDispatchProps {}

type ProductReviewProps = ProductReviewStateProps & ProductReviewDispatchProps;

const ProductReview: FC<ProductReviewProps> = ({
	productId,
	qtdRatings,
	ratingScale,
	percentages,
}) => {
	return (
		<Grid container sx={{ mt: 2 }} direction={'row'} spacing={2} item>
			<Grid item xs={3}>
				<Typography variant={'h6'} sx={{ mb: 1 }}>
					Customer reviews
				</Typography>
				<Grid container direction={'column'} item xs sx={{ mb: 1 }}>
					<Rating
						size={'medium'}
						name="read-only"
						precision={0.5}
						value={ratingScale}
						readOnly
					/>
					<Typography variant={'subtitle2'} color={'text.secondary'}>
						{qtdRatings} Reviews
					</Typography>
				</Grid>
				<PercentageReviews elements={percentages} />
			</Grid>
			<ReviewList productId={productId} qtdRatings={qtdRatings} />
		</Grid>
	);
};
export default ProductReview;
