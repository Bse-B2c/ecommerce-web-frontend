import {
	getToken,
	getRefreshToken,
	setTokens,
	removeTokens,
} from '@features/authentication/utils/utilsAuth';
import { Tokens } from '@features/authentication/model/Tokens';
import { User, Addresses } from '@features/authentication/model/User';

export type { Tokens, User, Addresses };
export { getToken, getRefreshToken, removeTokens, setTokens };
