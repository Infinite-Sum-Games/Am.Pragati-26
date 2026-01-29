export const API_ROUTES = {
	AUTH: {
		REGISTER: "/auth/user/register",
		VERIFY_SIGNUP_OTP: "/auth/user/register/otp/verify",
		RESEND_SIGNUP_OTP: "/auth/user/register/otp/resend",
		LOGIN: "/auth/user/login",
		LOGOUT: "/auth/user/logout",
		SESSION: "/auth/user/session",
		FORGOT_PASSWORD: "/auth/user/forgot-password",
		VERIFY_RESET_OTP: "/auth/user/forgot-password/otp/verify",
		RESEND_RESET_OTP: "/auth/user/forgot-password/otp/resend",
	},

	EVENTS: {
		GET_ALL: "/events/",
		GET_ALL_AUTH: "/events/auth/",
		GET_BY_ID: (id: string) => `/events/${id}`,
		GET_BY_ID_AUTH: (id: string) => `/events/auth/${id}`,
		FAVOURITE: (id: string) => `/events/favourite/${id}`,
		BOOK: (id: string) => `/events/${id}/book`,
	},

	PROFILE: {
		GET: "user/profile",
		UPDATE: "user/profile/edit",
		TICKETS: "/user/profile/tickets",
	},

	TRANSACTIONS: {
		GET: "/user/profile/transactions",
		VERIFY: "/events/verify",
	},

	ACCOMMODATION: {
		SUBMIT: "/accommodation/",
		ELIGIBILITY_CHECK: "/accommodation/check",
	},
};
