import { createApi } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ApiResponse } from '@src/model/ApiResponse';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import {
	ProductsRatingAverage,
	ReviewsRatingPercentage,
} from '@src/model/StatsRating';
import { BaseSearch } from '@src/model/BaseSearch';
import { Rating } from '@src/model/Rating';

export const ratingApi = createApi({
	reducerPath: 'ratingApi',
	tagTypes: ['Rating'],
	baseQuery: baseQueryWithReauth(`${getServiceHost('rating')}/api/rating`),
	endpoints: builder => ({
		findMyReview: builder.query<
			Array<Rating>,
			{ productIds: Array<number> } & BaseSearch
		>({
			query: ({ productIds, orderBy, sortOrder, limit, page }) =>
				`/me?productId=${productIds.join(
					','
				)}&orderBy=${orderBy}&sortOrder=${sortOrder}&limit=${limit}&page=${page}`,
			transformResponse: (response: ApiResponse<Array<Rating>>): any =>
				response
					? response?.data.reduce(
							(acc: { [key: string]: Rating } = {}, currentValue) => {
								const key = currentValue.productId;

								if (!acc[key]) acc[key] = currentValue;

								return acc;
							},
							{}
					  )
					: {},
			providesTags: ['Rating'],
		}),
		getScalePercentage: builder.query<ReviewsRatingPercentage, number>({
			query: idProduct => `/stats/${idProduct}/scale/percentage`,
			transformResponse: (response: ApiResponse<ReviewsRatingPercentage>) =>
				response.data,
		}),
		getAverageProductReview: builder.query<number, number>({
			query: idProduct => `/stats/${idProduct}/scale/average`,
			transformResponse: (response: ApiResponse<number>) => response.data,
		}),
		getRatingAverages: builder.query<
			Array<ProductsRatingAverage>,
			Array<number>
		>({
			query: ids => `/stats/average?productIds=${ids.join(',')}`,
			transformResponse: (
				response: ApiResponse<Array<ProductsRatingAverage>>
			): any =>
				response
					? response?.data.reduce(
							(
								acc: { [key: string]: ProductsRatingAverage } = {},
								currentValue
							) => {
								const key = currentValue.productId;

								if (!acc[key]) acc[key] = currentValue;

								return acc;
							},
							{}
					  )
					: {},
		}),
		getProductReviews: builder.query<
			any,
			{ productId: Array<number> } & BaseSearch
		>({
			query: ({ productId, orderBy, sortOrder, limit, page }) =>
				`/?productId=${productId.join(
					','
				)}&orderBy=${orderBy}&sortOrder=${sortOrder}&limit=${limit}&page=${page}`,
			transformResponse: (response: ApiResponse<any>) => response.data,
		}),
		createRating: builder.mutation<Rating, Omit<Rating, 'id' | 'date'>>({
			query: body => ({
				url: '/',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Rating'],
		}),
		editRating: builder.mutation<
			Rating,
			{ id: number; comment: string; ratingScale: number; authorName: string }
		>({
			query: ({ id, ...body }) => ({
				url: `/${id}`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Rating'],
		}),
	}),
});

export const {
	useGetScalePercentageQuery,
	useGetAverageProductReviewQuery,
	useGetProductReviewsQuery,
	useGetRatingAveragesQuery,
	useCreateRatingMutation,
	useFindMyReviewQuery,
	useEditRatingMutation,
} = ratingApi;
