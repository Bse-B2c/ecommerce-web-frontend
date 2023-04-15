import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { FetchArgs } from '@reduxjs/toolkit/query';
import {
	getRefreshToken,
	getToken,
	removeTokens,
	setTokens,
} from '@features/authentication';
import type { Tokens } from '@features/authentication';

const accountService = import.meta.env['VITE_ACCOUNT_SERVICE'];

const baseQuery = (serviceHost: string) =>
	fetchBaseQuery({
		baseUrl: serviceHost,
		credentials: 'same-origin',
		prepareHeaders: headers => {
			const token = getToken();
			if (token) headers.set('authorization', `Bearer ${token}`);

			return headers;
		},
	});

export const baseQueryWithReauth =
	(serviceHost: string) =>
	async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
		let result = await baseQuery(serviceHost)(args, api, extraOptions);

		const { error } = result;

		if (error && error.status === 401) {
			// try to get a new token
			const { error: refreshTokenError, data } = await baseQuery(
				`${accountService}/api/account/token`
			)(
				{
					url: '/refresh',
					method: 'POST',
					body: { refreshToken: getRefreshToken() || '' },
				},
				api,
				extraOptions
			);

			if (!refreshTokenError) {
				const {
					data: { token, refreshToken },
				} = data as { data: Tokens };

				setTokens({ token, refreshToken: refreshToken?.key ?? '' });

				result = await baseQuery(serviceHost)(args, api, extraOptions);
			} else {
				removeTokens();
			}
		} else if (error && error.status === 403) {
			removeTokens();
		}

		return result;
	};
