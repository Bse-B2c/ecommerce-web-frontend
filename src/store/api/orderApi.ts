import { createApi } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ApiResponse } from '@src/model/ApiResponse';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { Order } from '@src/model/Order';
import { BaseSearch } from '@src/model/BaseSearch';
import { Items, ShoppingCart } from '@src/model/ShoppingCart';

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('order')}/api/order`),
	tagTypes: ['ShoppingCart', 'CartItem'],
	endpoints: builder => ({
		findOderHistory: builder.query<
			Array<Order>,
			{ status?: number } & BaseSearch
		>({
			query: ({ orderBy, status, sortOrder, page, limit }) =>
				`/details/?orderBy=${orderBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}&status=${status}`,
			transformResponse: (response: ApiResponse<Array<Order>>) => response.data,
		}),
		createShoppingCart: builder.mutation<ShoppingCart, number>({
			query: userId => ({
				method: 'POST',
				url: '/cart/shopping/',
				body: { userId },
			}),
			transformResponse: (response: ApiResponse<ShoppingCart>) => response.data,
			invalidatesTags: ['ShoppingCart'],
		}),
		getUserShoppingCart: builder.query<ShoppingCart, void>({
			query: () => `/cart/shopping/me`,
			transformResponse: (response: ApiResponse<ShoppingCart>) => response.data,
			providesTags: ['ShoppingCart', 'CartItem'],
		}),
		addItem: builder.mutation<Items, { productId: number; price: number }>({
			query: body => ({
				method: 'PATCH',
				url: `/cart/item/add`,
				body,
			}),
			invalidatesTags: ['CartItem'],
			transformResponse: (response: ApiResponse<Items>) => response.data,
			transformErrorResponse: baseQueryReturnValue => baseQueryReturnValue.data,
		}),
		removeItem: builder.mutation<Items, number>({
			query: productId => ({
				method: 'PATCH',
				url: `/cart/item/remove`,
				body: { productId },
			}),
			invalidatesTags: ['CartItem'],
			transformResponse: (response: ApiResponse<Items>) => response.data,
			transformErrorResponse: baseQueryReturnValue => baseQueryReturnValue.data,
		}),
	}),
});

export const {
	useFindOderHistoryQuery,
	useCreateShoppingCartMutation,
	useGetUserShoppingCartQuery,
	useAddItemMutation,
	useRemoveItemMutation,
} = orderApi;
