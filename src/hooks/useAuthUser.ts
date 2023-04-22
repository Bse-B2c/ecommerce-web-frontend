import { User } from '@features/authentication/model/User';
import { accountApi } from '@store/api/accountApi';

export const useAuthUser = (): User | undefined => {
	const state = accountApi?.endpoints?.getMe?.useQueryState();

	return state?.data;
};
