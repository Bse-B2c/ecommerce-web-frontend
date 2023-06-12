import React, { FC } from 'react';
import { Card, CardContent, Grid, Rating, Typography } from '@mui/material';

interface ReviewCardStateProps {
	title: string;
	subTitle: string;
	ratingValue: number;
	description: string;
}
interface ReviewCardDispatchProps {}

type ReviewCardProps = ReviewCardStateProps & ReviewCardDispatchProps;

const ReviewCard: FC<ReviewCardProps> = ({
	title,
	subTitle,
	ratingValue,
	description,
}) => {
	return (
		<Card variant={'outlined'} sx={{ width: '100%', mt: 1 }}>
			<CardContent>
				<Grid item spacing={1} container xs>
					<Grid container xs={12} item justifyContent={'space-between'}>
						<Grid item xs>
							<Typography variant={'body1'}>
								<strong>{title}</strong>
							</Typography>
							<Typography variant={'subtitle2'} color={'text.secondary'}>
								{subTitle}
							</Typography>
						</Grid>
						<Grid
							container
							xs={4}
							item
							alignItems={'center'}
							justifyContent={'end'}>
							<Rating
								size={'small'}
								name="read-only"
								value={ratingValue}
								readOnly
							/>
							<Typography
								sx={{ ml: 1 }}
								variant="body2"
								color={'text.secondary'}>
								{ratingValue}
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant={'body2'}>{description}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default ReviewCard;
