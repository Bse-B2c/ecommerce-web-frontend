import React, { FC } from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';

interface PercentageReviewsStateProps {
	elements: Array<{ scale: number; percentage: number }>;
}
interface PercentageReviewsDispatchProps {}

type PercentageReviewsProps = PercentageReviewsStateProps &
	PercentageReviewsDispatchProps;

const PercentageReviews: FC<PercentageReviewsProps> = ({ elements }) => {
	const content =
		Array.isArray(elements) && elements.length > 0
			? elements.map(({ scale, percentage }, index) => (
					<Grid
						key={`${scale}-${index}`}
						container
						item
						spacing={1}
						alignItems={'center'}>
						<Grid item xs={2}>
							<Typography variant="body2" color="text.secondary">
								{scale} Star
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<LinearProgress
								color="success"
								variant="determinate"
								value={percentage}
							/>
						</Grid>
						<Grid item xs={2}>
							<Typography variant="body2" color="text.secondary">
								{percentage} %
							</Typography>
						</Grid>
					</Grid>
			  ))
			: null;

	return <Box>{content}</Box>;
};

export default PercentageReviews;
