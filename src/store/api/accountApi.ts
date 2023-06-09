import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { getServiceHost } from '@utils/getServiceHost';
import { Addresses, Tokens } from '@features/authentication';
import { ApiResponse } from '@src/model/ApiResponse';
import { User } from '@features/authentication/model/User';
import { BaseSearch } from '@src/model/BaseSearch';

interface UserPayload {
	name: string;
	email: string;
	password: string;
	phone: string;
	cpf: string;
	brithDate: string;
}

export const accountApi = createApi({
	reducerPath: 'accountApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('account')}/api/account`),
	tagTypes: ['Address', 'User'],
	endpoints: builder => ({
		createCustomer: builder.mutation<User, UserPayload>({
			query: body => ({
				url: '/user/',
				method: 'POST',
				body,
			}),
			transformResponse: (response: ApiResponse<User>) => response.data,
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
			providesTags: ['User'],
		}),
		updateMe: builder.mutation<User, Omit<UserPayload, 'password'>>({
			query: body => ({
				url: `/user/me`,
				method: 'PATCH',
				body,
			}),
			transformResponse: (response: ApiResponse<User>) => {
				return response.data;
			},
			invalidatesTags: ['User'],
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
		addPinnedAddress: builder.mutation<Addresses, number>({
			query: id => ({
				url: `/address/${id}/active`,
				method: 'PATCH',
			}),
			invalidatesTags: ['Address'],
		}),
		getOrderAddress: builder.query<Array<Addresses>, void>({
			query: () => `/address/me?limit=999`,
			transformResponse: (response: ApiResponse<Array<Addresses>>): any => {
				return response
					? response.data.reduce(
							(acc: { [key: number]: Addresses } = {}, currentData) => {
								const key = currentData.id;

								if (!acc[key]) acc[key] = currentData;

								return acc;
							},
							{}
					  )
					: {};
			},
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
	useAddPinnedAddressMutation,
	useUpdateMeMutation,
	useGetOrderAddressQuery,
} = accountApi;
