interface Error {
	statusCode: number;
	error: string;
	message: string;
}

export interface ApiResponse<T> {
	data: T;
	error: Error | null;
}
