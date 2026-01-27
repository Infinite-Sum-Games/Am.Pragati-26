import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthService } from '@/services/authService';

export function useResetPasswordResendOtp() {
    return useMutation({
        mutationFn: AuthService.resendResetPasswordOtp,
        onSuccess: () => {
            toast.success('OTP resent successfully.');
        },
        onError: () => {
            toast.error('Failed to resend OTP. Please try again.');
        },
    });
}
