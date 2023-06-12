import { createApi } from '@reduxjs/toolkit/query/react';
import { getServiceHost } from '@utils/getServiceHost';
import { ApiResponse } from '@src/model/ApiResponse';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { Category } from '@src/model/Category';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('category')}/api/category`),
	endpoints: builder => ({
		getAllCategories: builder.query<Array<Category>, undefined>({
			query: () => `/`,
			transformResponse: (response: ApiResponse<Array<Category>>) =>
				response.data,
		}),
	}),
});

export const { useGetAllCategoriesQuery } = categoryApi;
