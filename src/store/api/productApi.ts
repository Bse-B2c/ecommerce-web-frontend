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
		findProducts: builder.query<
			Array<Product>,
			{ categories: string } & BaseSearch
		>({
			query: ({ page, limit, orderBy, sortOrder, categories }) =>
				`/?page=${page}&limit=${limit}&orderBy=${orderBy}&sortOrder=${sortOrder}&categories=${categories}`,
			transformResponse: (response: ApiResponse<Array<Product>>) =>
				response.data,
		}),
	}),
});

export const { useGetProductQuery, useFindProductsQuery } = productApi;
