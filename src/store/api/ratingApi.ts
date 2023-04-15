import { createApi } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ApiResponse } from '@src/model/ApiResponse';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { ReviewsRatingPercentage } from '@src/model/StatsRating';

export const ratingApi = createApi({
	reducerPath: 'ratingApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('rating')}/api/rating`),
	endpoints: builder => ({
		getScalePercentage: builder.query<ReviewsRatingPercentage, number>({
			query: idProduct => `/stats/${idProduct}/scale/percentage`,
			transformResponse: (response: ApiResponse<ReviewsRatingPercentage>) =>
				response.data,
		}),
		getAverageProductReview: builder.query<number, number>({
			query: idProduct => `/stats/${idProduct}/scale/average`,
			transformResponse: (response: ApiResponse<number>) => response.data,
		}),
	}),
});

export const { useGetScalePercentageQuery, useGetAverageProductReviewQuery } =
	ratingApi;
