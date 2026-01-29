import { apiGet, apiPost } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import type { LoginFormValues, LoginResponse, User } from "@/types/login";
import type { VerifyOtpResponse } from "@/types/otpTypes";
import type { ResetPasswordFormValues } from "@/types/resetPasswordTypes";
import type { SignUpFormValues } from "@/types/signUpTypes";

export const AuthService = {
	signUp: async (
		payload: SignUpFormValues,
	): Promise<{ message: string; expiry_at: string }> => {
		try {
			const csrfData = await apiGet<{ key: string }>(API_ROUTES.AUTH.REGISTER);
			const csrfToken = csrfData.key;

			return await apiPost<{ message: string; expiry_at: string }>(
				API_ROUTES.AUTH.REGISTER,
				payload,
				{
					headers: {
						"X-Csrf-Token": csrfToken,
					},
				},
			);
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message || error.message || "Signup failed";
			throw new Error(message);
		}
	},

	verifySignupOtp: async (payload: {
		otp: string;
	}): Promise<VerifyOtpResponse> => {
		try {
			const csrfData = await apiGet<{ key: string }>(
				API_ROUTES.AUTH.VERIFY_SIGNUP_OTP,
			);
			const csrfToken = csrfData.key;

			return apiPost<VerifyOtpResponse>(
				API_ROUTES.AUTH.VERIFY_SIGNUP_OTP,
				payload,
				{
					headers: {
						"X-Csrf-Token": csrfToken,
					},
				},
			);
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error.message ||
				"OTP Verification failed";
			throw new Error(message);
		}
	},

	resendSignupOtp: async (): Promise<{ message: string }> => {
		try {
			return await apiGet<{ message: string }>(
				API_ROUTES.AUTH.RESEND_SIGNUP_OTP,
			);
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message || error.message || "Resend OTP failed";
			throw new Error(message);
		}
	},

	login: async (payload: LoginFormValues): Promise<LoginResponse> => {
		try {
			const csrfData = await apiGet<{ key: string }>(API_ROUTES.AUTH.LOGIN);
			const csrfToken = csrfData.key;

			return await apiPost<LoginResponse>(API_ROUTES.AUTH.LOGIN, payload, {
				headers: {
					"X-Csrf-Token": csrfToken,
				},
			});
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message || error.message || "Login failed";
			throw new Error(message);
		}
	},

	logout: async (): Promise<{ message: string }> => {
		try {
			return await apiGet<{ message: string }>(API_ROUTES.AUTH.LOGOUT);
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message || error.message || "Logout failed";
			throw new Error(message);
		}
	},

	getSession: async (): Promise<{ user: User | null }> => {
		try {
			const data = await apiGet<User & { message: string }>(
				API_ROUTES.AUTH.SESSION,
			);
			return {
				user: data,
			};
		} catch (_error) {
			// console.error('Session fetch error:', error);
			return { user: null };
		}
	},

	resetPassword: async (
		payload: ResetPasswordFormValues,
	): Promise<{ message: string }> => {
		try {
			const csrfData = await apiGet<{ key: string }>(
				API_ROUTES.AUTH.FORGOT_PASSWORD,
			);
			const csrfToken = csrfData.key;

			const { email, password } = payload;
			return await apiPost<{ message: string }>(
				API_ROUTES.AUTH.FORGOT_PASSWORD,
				{ email, new_password: password },
				{
					headers: {
						"X-Csrf-Token": csrfToken,
					},
				},
			);
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error.message ||
				"Reset password failed";
			throw new Error(message);
		}
	},

	verifyResetPasswordOtp: async (payload: {
		otp: string;
	}): Promise<VerifyOtpResponse> => {
		try {
			const csrfData = await apiGet<{ key: string }>(
				API_ROUTES.AUTH.VERIFY_RESET_OTP,
			);
			const csrfToken = csrfData.key;

			return apiPost<VerifyOtpResponse>(
				API_ROUTES.AUTH.VERIFY_RESET_OTP,
				payload,
				{
					headers: {
						"X-Csrf-Token": csrfToken,
					},
				},
			);
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error.message ||
				"OTP Verification for Reset Password failed";
			throw new Error(message);
		}
	},

	resendResetPasswordOtp: async (): Promise<{ message: string }> => {
		try {
			return await apiGet<{ message: string }>(
				API_ROUTES.AUTH.RESEND_RESET_OTP,
			);
			// biome-ignore lint/suspicious/noExplicitAny: error message is extracted from the error object
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error.message ||
				"Resend Reset Password OTP failed";
			throw new Error(message);
		}
	},
};
