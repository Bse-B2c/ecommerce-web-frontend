import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { getServiceHost } from '@utils/getServiceHost';
import { Tokens } from '@features/authentication';
import { ApiResponse } from '@src/model/ApiResponse';
import { User } from '@features/authentication/model/User';

export const accountApi = createApi({
	reducerPath: 'accountApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('account')}/api/account`),
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
	}),
});

export const {
	useLoginMutation,
	useLazyGetMeQuery,
	useCreateCustomerMutation,
} = accountApi;
