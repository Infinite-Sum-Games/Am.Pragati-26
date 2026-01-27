import { createFileRoute } from '@tanstack/react-router';
import { ResetPasswordOtpVerificationForm } from '@/features/otp/ResetPasswordOtpVerificationForm';

export const Route = createFileRoute('/reset-password/verify')({
    component: ResetPasswordOtpVerificationPage,
});

function ResetPasswordOtpVerificationPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
            <div className="w-full max-w-md mx-auto relative z-10">
                <ResetPasswordOtpVerificationForm />
            </div>
        </div>
    );
}
