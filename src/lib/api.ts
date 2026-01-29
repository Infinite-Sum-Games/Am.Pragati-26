import axios from "axios";
import axiosRetry from "axios-retry";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/auth.store"; // Adjusted path
// import { useMaintenanceStore } from '@/stores/useMaintenanceStore'; // Assuming this needs to be created or adjusted
import { API_ROUTES } from "./routes";

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_URL}`, // Adjusted for Vite
	timeout: 10000,
	withCredentials: true,
});

axiosRetry(api, {
	retries: 3,
	retryDelay: (retryCount, error) => {
		if (error.response?.status === 408) {
			return 5000;
		}
		return axiosRetry.exponentialDelay(retryCount);
	},
	retryCondition: (error) => {
		return (
			error.response?.status === 429 ||
			error.response?.status === 408 ||
			error.code === "ECONNABORTED"
		);
	},
});

// Request interceptor
api.interceptors.request.use((config) => {
	if (config.headers?.skipAuth) {
		delete config.headers.skipAuth;
		return config;
	}

	return config;
});

// Response interceptor
api.interceptors.response.use(
	(response) => {
		try {
			// useMaintenanceStore.getState().setMaintenance(false); // Adjust or remove if not present
		} catch (_e) {}
		if (response?.data?.message) {
			// toast.success(response.data.message);
		}
		return response;
	},
	(error) => {
		const status = error?.response?.status;
		const message =
			error?.response?.data?.message || error.message || "Something went wrong";

		// Log error in development
		if (
			import.meta.env.MODE === "development" && // Adjusted for Vite
			!(status === 401 && error?.config?.url?.includes(API_ROUTES.AUTH.SESSION))
		) {
			console.error("[API Error]", {
				status,
				message,
				url: error?.config?.url,
				method: error?.config?.method,
				error: error?.response?.data,
			});
		}

		if (status === 401) {
			if (error.config?.url?.includes(API_ROUTES.AUTH.SESSION)) {
				return Promise.resolve({ data: null });
			} else if (
				error.config?.url?.includes(`${API_ROUTES.AUTH.REGISTER}/otp`)
			) {
				toast.error("Signup session expired. Please sign up again.");
				window.location.href = "/signup";
			} else {
				if (!error.config?.url?.includes(API_ROUTES.AUTH.LOGOUT)) {
					toast.error("Session expired. Please login again.");
				}
				useAuthStore.getState().logout();
				window.location.href = "/login";
			}
		} else if (status === 400) {
			if (error.config?.url?.includes(`${API_ROUTES.AUTH.LOGIN}`)) {
				toast.error("Invalid email domain.");
			}
		} else if (status === 404) {
			const contentType = error?.response?.headers?.["content-type"] || "";
			if (
				contentType.includes("application/json") &&
				error?.response?.data?.message
			) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Resource not found");
			}
		} else if (status === 403) {
			// Toasts are skipped for 403 errors
		} else if (status === 408) {
			toast.error("Please try again later.");
		} else if (status === 429) {
			toast.error("Too many requests. Please try again later.");
		} else if (status === 500) {
			try {
				// useMaintenanceStore.getState().setMaintenance(false); // Adjust or remove if not present
			} catch (_e) {}
			toast.error("Server error. Please try again later.");
		} else if (status === 503) {
			try {
				// useMaintenanceStore.getState().setMaintenance(true); // Adjust or remove if not present
			} catch (_e) {}
		} else if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
			toast.error("Network Error: Unable to connect to server");
		} else {
			toast.error(message);
		}

		return Promise.reject(error);
	},
);

// Helper functions
export async function apiGet<T>(
	url: string,
	options?: { skipAuth?: boolean },
): Promise<T> {
	const res = await api.get<T>(url, {
		headers: options?.skipAuth ? { skipAuth: true } : undefined,
	});
	// console.log('[apiGet] Data fetched from', url, ':', res.data);
	return res.data;
}

export async function apiPost<T>(
	url: string,
	data?: unknown,
	options?: { skipAuth?: boolean; headers?: Record<string, string> },
): Promise<T> {
	const res = await api.post<T>(url, data, {
		headers: {
			...(options?.skipAuth && { skipAuth: "true" }),
			...options?.headers,
		},
	});
	return res.data;
}

export async function apiPut<T>(
	url: string,
	data?: unknown,
	options?: { skipAuth?: boolean; headers?: Record<string, string> },
): Promise<T> {
	const headers: Record<string, string> = {};
	if (options?.skipAuth) headers.skipAuth = "true";
	if (options?.headers) Object.assign(headers, options.headers);
	const res = await api.put<T>(url, data, {
		headers: Object.keys(headers).length > 0 ? headers : undefined,
	});
	return res.data;
}

export async function apiDelete<T>(
	url: string,
	options?: { skipAuth?: boolean; headers?: Record<string, string> },
): Promise<T> {
	const headers: Record<string, string> = {};
	if (options?.skipAuth) headers.skipAuth = "true";
	if (options?.headers) Object.assign(headers, options.headers);
	const res = await api.delete<T>(url, {
		headers: Object.keys(headers).length > 0 ? headers : undefined,
	});
	return res.data;
}
