import React, { FC, useState } from 'react';
import { Grid, Pagination, Typography } from '@mui/material';
import ReviewCard from '@components/ReviewCard';
import { useGetProductReviewsQuery } from '@store/api/ratingApi';
import { formatDate } from '@utils/utilsDate';

interface ReviewListStateProps {
	productId: number;
	qtdRatings: number;
}
interface ReviewListDispatchProps {}

type ReviewListProps = ReviewListStateProps & ReviewListDispatchProps;

const ReviewList: FC<ReviewListProps> = ({ productId, qtdRatings }) => {
	const [page, setPage] = useState<number>(0);
	const limit = 10;
	const { data } = useGetProductReviewsQuery({
		productId,
		orderBy: 'date',
		sortOrder: 'DESC',
		limit,
		page,
	});

	const reviews =
		Array.isArray(data) && data.length > 0
			? data.map(({ id, ratingScale, authorName, comment, date }, index) => (
					<ReviewCard
						key={`${id}-${index}`}
						title={authorName}
						subTitle={`Rated in ${formatDate(date)}`}
						ratingValue={ratingScale}
						description={comment}
					/>
			  ))
			: null;
	const totalPages = Math.round(qtdRatings / limit);
	return (
		<Grid container direction="column" spacing={2} item xs={9}>
			<Grid item xs>
				<Typography variant={'h6'}>Reviews</Typography>
				{reviews}
			</Grid>
			<Grid container alignItems={'center'} justifyContent={'center'} item xs>
				<Pagination
					count={totalPages === 0 ? 1 : totalPages}
					onChange={(event, newPage) => setPage(newPage - 1)}
					color="primary"
				/>
			</Grid>
		</Grid>
	);
};

export default ReviewList;
