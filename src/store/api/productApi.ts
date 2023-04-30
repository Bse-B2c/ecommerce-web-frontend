import { createApi } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ApiResponse } from '@src/model/ApiResponse';
import { Product } from '@features/Product/model/Product';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { BaseSearch } from '@src/model/BaseSearch';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('product')}/api/product`),
	endpoints: builder => ({
		getProduct: builder.query<Product, number>({
			query: id => `/${id}`,
			transformResponse: (response: ApiResponse<Product>) => response.data,
		}),
		searchProducts: builder.query<Array<Product>, string>({
			query: name => `/?name=${name}&limit=99`,
			transformResponse: (response: ApiResponse<Array<Product>>) =>
				response.data,
		}),
		findProducts: builder.query<
			Array<Product>,
			{ categories: string; name: string } & BaseSearch
		>({
			query: ({ page, limit, orderBy, sortOrder, categories, name }) =>
				`/?name=${name}&page=${page}&limit=${limit}&orderBy=${orderBy}&sortOrder=${sortOrder}&categories=${categories}`,
			transformResponse: (response: ApiResponse<Array<Product>>) =>
				response.data,
		}),
		findOffers: builder.query<Array<Product>, void>({
			query: () => `/?discount=true&limit=10`,
			transformResponse: (response: ApiResponse<Array<Product>>) =>
				response.data,
		}),
	}),
});

export const {
	useGetProductQuery,
	useFindProductsQuery,
	useLazySearchProductsQuery,
	useFindOffersQuery,
} = productApi;
