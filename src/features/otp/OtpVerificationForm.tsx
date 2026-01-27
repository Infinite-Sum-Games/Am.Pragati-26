'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { OtpVerificationView } from '@/components/otp/OtpVerificationView'; // Adjusted import
import { useOtpCountdownTimer } from '@/hooks/useOtpCountdownTimer';
import { useSignupOtpVerification } from '@/hooks/useSignupOtpVerification';
import { useSignupResendOtp } from '@/hooks/useSignupResendOtp';
import { type OtpFormValues, otpSchema } from '@/types/otpTypes';

export function OtpVerificationForm() {
  const { setValue, watch, formState } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const otp = watch('otp');
  const { mutate: verifyOtp, isPending } = useSignupOtpVerification();
  const { mutate: resendOtp, isPending: isResending } = useSignupResendOtp();

  const { countdown, showResend, handleResend } = useOtpCountdownTimer({
    onResend: () => resendOtp(), //API trigger for resending otp
    storageKey: 'signupResendStartTime',
  });
  const handleChange = (val: string) => {
    setValue('otp', val, { shouldValidate: true });
  };

  const onSubmit = () => {
    if (otp.length === 6) {
      verifyOtp({ otp }); //API trigger for verifying otp
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
