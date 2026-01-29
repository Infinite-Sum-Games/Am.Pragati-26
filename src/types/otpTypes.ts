import { z } from "zod";

export const otpSchema = z.object({
	otp: z
		.string()
		.length(6, "OTP must be 6 digits")
		.regex(/^\d+$/, "OTP must contain only numbers"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export type OtpProps = {
	otp: string;
	onOtpChange: (val: string) => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	error?: string;
	showResend: boolean;
	onResendClick: () => void;
	isResending: boolean;
	countdown: number;
};

export type VerifyOtpResponse = {
	//backend response type
	success: boolean;
};
