import { User } from '@features/authentication/model/User';
import { accountApi } from '@store/api/accountApi';

interface UseAuthUser {
	user?: User;
	isError: boolean;
	isFetching: boolean;
	isLoading: boolean;
	isUninitialized: boolean;
}

export const useAuthUser = (): UseAuthUser => {
	const { data, isError, isFetching, isLoading, isUninitialized } =
		accountApi?.endpoints?.getMe?.useQueryState();

	return { user: data, isError, isFetching, isLoading, isUninitialized };
};
