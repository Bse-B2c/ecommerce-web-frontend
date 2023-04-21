import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@src/lib/baseQueryWithReauth';
import { getServiceHost } from '@utils/getServiceHost';

export const accountApi = createApi({
	reducerPath: 'accountApi',
	baseQuery: baseQueryWithReauth(`${getServiceHost('account')}/api/account`),
	endpoints: () => ({}),
});
