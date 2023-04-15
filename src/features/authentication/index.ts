import {
	getToken,
	getRefreshToken,
	setTokens,
	removeTokens,
} from '@features/authentication/utils/utilsAuth';
import { Tokens } from '@features/authentication/model/Tokens';

export type { Tokens };
export { getToken, getRefreshToken, removeTokens, setTokens };
