import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ApiResponse } from '@src/model/ApiResponse';
import { Product } from '@features/Product/model/Product';

export const publicProductApi = createApi({
	reducerPath: 'publicProductApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${getServiceHost('product')}/api/product`,
	}),
	endpoints: builder => ({
		getProduct: builder.query<Product, number>({
			query: id => `/${id}`,
			transformResponse: (response: ApiResponse<Product>) => response.data,
		}),
	}),
});

export const { useGetProductQuery } = publicProductApi;
