import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthService } from "@/services/auth.service";

export function useSignupResendOtp() {
	return useMutation({
		mutationFn: AuthService.resendSignupOtp,
		onSuccess: () => {
			toast.success("OTP resent successfully!");
		},
		// biome-ignore lint/suspicious/noExplicitAny: reason
		onError: (error: any) => {
			toast.error(error?.message || "Failed to resend OTP. Please try again.");
		},
	});
}
