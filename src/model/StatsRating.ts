export interface ScalePercentage {
	total: number;
	scale: number;
	percentage: number;
}

export interface ReviewsRatingPercentage {
	total: number;
	percentages: Array<ScalePercentage>;
}
