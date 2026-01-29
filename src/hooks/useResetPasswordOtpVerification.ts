"use client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router"; // Changed from useRouter
import toast from "react-hot-toast";
import { AuthService } from "@/services/auth.service";

export function useResetPasswordOtpVerification() {
	const navigate = useNavigate(); // Changed from router
	return useMutation({
		mutationFn: AuthService.verifyResetPasswordOtp,
		onSuccess: () => {
			toast.success("OTP verified successfully. Please login.");
			navigate({ to: "/login" }); // Changed from router.push
		},
		// biome-ignore lint/suspicious/noExplicitAny: reason
		onError: (error: any) => {
			// Error handling is also managed by the api interceptor, but a specific toast here is fine.
			toast.error(error?.message || "OTP Verification failed!");
		},
	});
}
