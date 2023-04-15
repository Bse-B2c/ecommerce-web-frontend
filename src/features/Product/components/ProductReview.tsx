import React, { FC } from 'react';
import { Grid, Rating, Typography } from '@mui/material';
import ReviewCard from '@components/ReviewCard';
import PercentageReviews from '@features/Product/components/PercentageReviews';
import { ScalePercentage } from '@src/model/StatsRating';

interface ProductReviewStateProps {
	qtdRatings: number;
	ratingScale: number;
	percentages: Array<ScalePercentage>;
}
interface ProductReviewDispatchProps {}

type ProductReviewProps = ProductReviewStateProps & ProductReviewDispatchProps;

const ProductReview: FC<ProductReviewProps> = ({
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
						value={ratingScale}
						readOnly
					/>
					<Typography variant={'subtitle2'} color={'text.secondary'}>
						{qtdRatings} Reviews
					</Typography>
				</Grid>
				<PercentageReviews elements={percentages} />
			</Grid>
			<Grid item xs={9}>
				<Typography variant={'h6'}>Reviews</Typography>
				<ReviewCard
					title={'Rodrigo Limões'}
					subTitle={'Rated in 21 set. 2021'}
					ratingValue={5}
					description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
					unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
					quibusdam, aliquam dolore excepturi quae. Distinctio enim at
					eligendi perferendis in cum quibusdam sed quae, accusantium et
					aperiam?`}
				/>
			</Grid>
		</Grid>
	);
};
export default ProductReview;
