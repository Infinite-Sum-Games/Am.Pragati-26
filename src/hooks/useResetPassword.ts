import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router'; // Changed from useRouter
import toast from 'react-hot-toast';
import { hashPassword } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import type { ResetPasswordFormValues } from '@/types/resetPasswordTypes';



export function useResetPassword() {
  const navigate = useNavigate(); // Changed from router
  return useMutation<void, Error, ResetPasswordFormValues>({ // Changed payload type
    mutationFn: async (data: ResetPasswordFormValues) => { // Changed payload type
      const hashedNewPassword = await hashPassword(data.password);
      const payload = {
        email: data.email,
        password: hashedNewPassword,
        confirmPassword: hashedNewPassword,
      };
      await AuthService.resetPassword(payload);
    },
    onSuccess: () => {
      toast.success('Password reset initiated. Please verify the OTP.');
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'resetPasswordResendStartTime',
          Date.now().toString(),
        );
      }
      navigate({ to: '/reset-password/verify' }); // Changed from router.push
    },
    onError: (error: any) => {
        // Error handling is also managed by the api interceptor, but a specific toast here is fine.
        toast.error(error?.message || 'Password reset failed. Please try again.');
    },
  });
}