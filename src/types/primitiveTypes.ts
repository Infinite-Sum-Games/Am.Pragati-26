export interface ApiResponse<T> {
	message?: string;
	data: T;
	code?: number;
}
