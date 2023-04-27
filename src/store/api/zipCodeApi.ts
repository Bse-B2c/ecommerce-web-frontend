import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ZipCode } from '@src/model/ZipCode';

export const zipCodeApi = createApi({
	reducerPath: 'zipCodeApi',
	baseQuery: fetchBaseQuery({ baseUrl: getServiceHost('zipcode') }),
	endpoints: builder => ({
		getZipCode: builder.query<ZipCode, string>({
			query: zipCode => `/${zipCode}/json`,
		}),
	}),
});

export const { useLazyGetZipCodeQuery } = zipCodeApi;
