import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";
import { toast } from "react-hot-toast";

export const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL
		? `${String(import.meta.env.VITE_BACKEND_URL).replace(/\/+$/, "")}/api`
		: // May include versioning (eg : v1)
			"/api",
	timeout: 10000,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	skipAuth?: boolean;
}

// Request interceptor
api.interceptors.request.use((config) => {
	const customConfig = config as CustomAxiosRequestConfig;
	if (customConfig.skipAuth) return config;

	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

// Response interceptor
api.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response?.data?.message) {
			toast.success(response.data.message);
		}
		return response;
	},
	(error: AxiosError<{ message?: string }>) => {
		const status = error?.response?.status;
		const message = error?.response?.data?.message || "Something went wrong";

		if (status === 401) {
			toast.error("Session expired. Please login again.");
			localStorage.removeItem("token");

			// Refresh token ???

			window.location.href = "/login";
		} else {
			toast.error(message);
		}

		return Promise.reject(error);
	},
);

// Helper functions
export async function apiGet<T>(
	url: string,
	options?: {
		skipAuth?: boolean;
		signal?: AbortSignal;
		params?: Record<string, unknown>;
	},
): Promise<T> {
	const res = await api.get<T>(url, {
		...(options ?? {}),
		skipAuth: options?.skipAuth,
	} as any);
	return res.data;
}

export async function apiPost<T>(
	url: string,
	data?: unknown,
	options?: { skipAuth?: boolean; signal?: AbortSignal },
): Promise<T> {
	const res = await api.post<T>(url, data, {
		...(options ?? {}),
		skipAuth: options?.skipAuth,
	} as any);
	return res.data;
}
