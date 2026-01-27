import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
// import { useRouter } from 'next/navigation'; // Changed to tanstack router
import toast from 'react-hot-toast';
import { hashPassword } from '@/lib/utils';
import { AuthService } from '@/services/authService';

export function useResetPassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            // Important: Hash password before sending if required by backend
            const hashedNewPassword = await hashPassword(data.password);
            await AuthService.resetPassword({
                email: data.email,
                password: hashedNewPassword,
                confirmPassword: hashedNewPassword,
            });
        },
        onSuccess: () => {
            toast.success('Password reset initiated. Please verify the OTP.');
            // Set timestamp for countdown timer
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('resetPasswordResendStartTime', Date.now().toString());
            }
            // router.push('/reset-password/verify'); // Next.js
            router.navigate({ to: '/reset-password/verify' }); // TanStack Router
        },
        onError: () => toast.error('Password reset failed. Please try again.'),
    });
}
