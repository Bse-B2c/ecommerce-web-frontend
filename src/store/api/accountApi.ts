import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { getServiceHost } from '@utils/getServiceHost';
import { Addresses, Tokens } from '@features/authentication';
import { ApiResponse } from '@src/model/ApiResponse';
import { User } from '@features/authentication/model/User';
import { BaseSearch } from '@src/model/BaseSearch';

export const accountApi = createApi({
	reducerPath: 'accountApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('account')}/api/account`),
	tagTypes: ['Address'],
	endpoints: builder => ({
		createCustomer: builder.mutation<
			User,
			{
				name: string;
				email: string;
				password: string;
				phone: string;
				cpf: string;
				brithDate: string;
			}
		>({
			query: body => ({
				url: '/user/',
				method: 'POST',
				body,
			}),
		}),
		login: builder.mutation<Tokens, { email: string; password: string }>({
			query: body => ({
				url: 'auth/signin',
				method: 'POST',
				body,
			}),
			transformResponse: (response: ApiResponse<Tokens>) => response.data,
		}),
		getMe: builder.query<User, void>({
			query: () => `user/me`,
			transformResponse: (response: ApiResponse<User>) => {
				return response.data;
			},
		}),
		getMeAddress: builder.query<Array<Addresses>, BaseSearch>({
			query: ({ orderBy, sortOrder, limit, page }) =>
				`/address/me?page=${page}&limit=${limit}&sortOrder=${sortOrder}&orderBy=${orderBy}`,
			transformResponse: (response: ApiResponse<Array<Addresses>>) => {
				return response.data;
			},
			providesTags: ['Address'],
		}),
		editAddress: builder.mutation<Addresses, Addresses>({
			query: ({ id, ...body }) => ({
				url: `/address/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Address'],
		}),
		createAddress: builder.mutation<
			Addresses,
			Omit<Addresses, 'id'> & { userId: number }
		>({
			query: body => ({
				url: `/address`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Address'],
		}),
		deleteAddress: builder.mutation<Addresses, number>({
			query: id => ({
				url: `/address/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Address'],
		}),
	}),
});

export const {
	useLoginMutation,
	useLazyGetMeQuery,
	useCreateCustomerMutation,
	useGetMeAddressQuery,
	useEditAddressMutation,
	useCreateAddressMutation,
	useDeleteAddressMutation,
} = accountApi;
