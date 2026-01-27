import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OtpVerficationView } from '@/components/otp/OtpVerificationView';
import { useOtpCountdownTimer } from '@/hooks/useOtpCountdownTimer';
import { useResetPasswordOtpVerification } from '@/hooks/useResetPasswordOtpVerification';
import { useResetPasswordResendOtp } from '@/hooks/useResetPasswordResendOtp';
import { otpSchema } from '@/types/otpTypes';

export function ResetPasswordOtpVerificationForm() {
    const { setValue, watch, formState } = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' },
    });
    const otp = watch('otp');
    const { mutate: verifyOtp, isPending } = useResetPasswordOtpVerification();
    const { mutate: resendOtp, isPending: isResending } = useResetPasswordResendOtp();
    const { countdown, showResend, handleResend } = useOtpCountdownTimer({
        storageKey: 'resetPasswordResendStartTime',
        onResend: () => resendOtp(),
    });

    const handleChange = (val: string) => setValue('otp', val, { shouldValidate: true });

    const onSubmit = () => {
        if (otp.length === 6) verifyOtp({ otp });
    };

    return (
        <OtpVerficationView
            otp={otp}
            onOtpChange={handleChange}
            onSubmit={onSubmit}
            isSubmitting={isPending}
            error={formState.errors.otp?.message as string | undefined}
            showResend={showResend}
            onResendClick={handleResend}
            isResending={isResending}
            countdown={countdown}
        />
    );
}
