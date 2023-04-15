export interface RefreshToken {
	id: number;
	expiresIn: number;
	key: string;
	userId: number;
}

export interface Tokens {
	token: string;
	refreshToken?: RefreshToken;
}
