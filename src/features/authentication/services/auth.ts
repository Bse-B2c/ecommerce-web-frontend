import { accountApi } from '@store/api/accountApi';
import { ApiResponse } from '@src/model/ApiResponse';
import { Tokens } from '@features/authentication';
import { User } from '@features/authentication/model/User';

export const auth = accountApi.injectEndpoints({
	endpoints: builder => ({
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

export const { useLoginMutation, useLazyGetMeQuery } = auth;
