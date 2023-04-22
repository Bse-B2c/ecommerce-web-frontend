import { User } from '@features/authentication/model/User';
import { auth } from '@features/authentication/services/auth';

export const useAuthUser = (): User | undefined => {
	const state = auth.endpoints.getMe.useQueryState();

	return state?.data;
};
