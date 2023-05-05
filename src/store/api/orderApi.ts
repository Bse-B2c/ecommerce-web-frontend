import { createApi } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ApiResponse } from '@src/model/ApiResponse';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { Order } from '@src/model/Order';
import { BaseSearch } from '@src/model/BaseSearch';

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('order')}/api/order`),
	endpoints: builder => ({
		findOderHistory: builder.query<
			Array<Order>,
			{ status?: number } & BaseSearch
		>({
			query: ({ orderBy, status, sortOrder, page, limit }) =>
				`/details/?orderBy=${orderBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}&status=${status}`,
			transformResponse: (response: ApiResponse<Array<Order>>) => response.data,
		}),
	}),
});

export const { useFindOderHistoryQuery } = orderApi;
