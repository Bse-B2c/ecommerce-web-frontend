export const getToken = () => localStorage.getItem('access-token');
export const getRefreshToken = () => localStorage.getItem('refresh-token');
export const setTokens = ({
	token,
	refreshToken,
}: {
	token: string;
	refreshToken: string;
}) => {
	localStorage.setItem('access-token', token);
	localStorage.setItem('refresh-token', refreshToken);
};
export const removeTokens = () => {
	localStorage.removeItem('access-token');
	localStorage.removeItem('refresh-token');
};
