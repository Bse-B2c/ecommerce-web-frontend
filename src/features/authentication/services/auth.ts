import { accountApi } from '@store/api/accountApi';
import { ApiResponse } from '@src/model/ApiResponse';
import { Tokens } from '@features/authentication';

const auth = accountApi.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<Tokens, { email: string; password: string }>({
			query: body => ({
				url: 'auth/signin',
				method: 'POST',
				body,
			}),
			transformResponse: (response: ApiResponse<Tokens>) => response.data,
		}),
	}),
});

export const { useLoginMutation } = auth;
