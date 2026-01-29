import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { OtpVerificationView } from "@/components/otp/OtpVerificationView"; // Adjusted import
import { useOtpCountdownTimer } from "@/hooks/useOtpCountdownTimer";
import { useResetPasswordOtpVerification } from "@/hooks/useResetPasswordOtpVerification";
import { useResetPasswordResendOtp } from "@/hooks/useResetPasswordResendOtp";
import { type OtpFormValues, otpSchema } from "@/types/otpTypes";

interface ResetPasswordOtpVerificationFormProps {
	// biome-ignore lint/suspicious/noExplicitAny: reason
	mutation?: UseMutationResult<any, any, { otp: string }, any>;
}

export function ResetPasswordOtpVerificationForm({
	mutation,
}: ResetPasswordOtpVerificationFormProps = {}) {
	const { setValue, watch, formState } = useForm<OtpFormValues>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: "" },
	});

	const otp = watch("otp");
	const defaultMutation = useResetPasswordOtpVerification();
	const { mutate: verifyOtp, isPending } = mutation || defaultMutation;
	const { mutate: resendOtp, isPending: isResending } =
		useResetPasswordResendOtp();

	const { countdown, showResend, handleResend } = useOtpCountdownTimer({
		storageKey: "resetPasswordResendStartTime",
		onResend: () => resendOtp(),
	});
	const handleChange = (val: string) => {
		setValue("otp", val, { shouldValidate: true });
	};

	const onSubmit = () => {
		if (otp.length === 6) {
			verifyOtp({ otp });
		}
	};

	return (
		<OtpVerificationView
			otp={otp}
			onOtpChange={handleChange}
			onSubmit={onSubmit}
			isSubmitting={isPending}
			error={formState.errors.otp?.message}
			showResend={showResend}
			onResendClick={handleResend}
			isResending={isResending}
			countdown={countdown}
		/>
	);
}
