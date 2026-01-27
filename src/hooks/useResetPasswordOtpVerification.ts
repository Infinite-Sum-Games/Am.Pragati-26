import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
// import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthService } from '@/services/authService';

export function useResetPasswordOtpVerification() {
    const router = useRouter();

    return useMutation({
        mutationFn: AuthService.verifyResetPasswordOtp,
        onSuccess: () => {
            toast.success('OTP verified successfully. Please login.');
            // router.push('/login');
            router.navigate({ to: '/login' });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'OTP verification failed.');
        }
    });
}
