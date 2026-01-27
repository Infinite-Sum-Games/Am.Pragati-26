import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import type { OtpProps } from '@/types/otpTypes';
import RetroWindowWrapper from '@/components/RetroWindowWrapper';

const otpSlots = ['a', 'b', 'c', 'd', 'e', 'f'];

function formatCountdown(seconds: number): string {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

export function OtpVerficationView({
    otp,
    onOtpChange,
    onSubmit,
    isSubmitting,
    error,
    showResend,
    onResendClick,
    isResending,
    countdown,
}: OtpProps) {
    return (
        <RetroWindowWrapper className="w-full max-w-md mx-auto" title="OTP VERIFICATION">
            <div className="text-center mb-4">
                <h1 className="text-white text-xl tracking-widest" style={{ fontFamily: '"Press Start 2P", cursive' }}>ENTER CODE</h1>
                <p className="text-[10px] text-white/70 mt-2" style={{ fontFamily: '"Press Start 2P", cursive' }}>Check your email</p>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="flex flex-col items-center gap-6"
            >
                <div className="flex flex-col items-center gap-3">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(val: string) => {
                            const numeric = val.replace(/\D/g, '');
                            onOtpChange(numeric);
                        }}
                        disabled={isSubmitting}
                        pattern="\d*"
                    >
                        <InputOTPGroup className="gap-2">
                            {otpSlots.map((key, i) => (
                                <InputOTPSlot
                                    key={key}
                                    index={i}
                                    className="w-10 h-10 sm:w-12 sm:h-12 text-sm font-bold border-2 rounded-none bg-black/40 border-[#7e22ce]/40 text-white focus:border-[#a855f7] ring-offset-black"
                                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                {error && (
                    <p className="text-[8px] text-red-500 text-center font-medium" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                        {error}
                    </p>
                )}
                <Button
                    type="submit"
                    disabled={otp.length !== 6 || isSubmitting}
                    className="w-full bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold py-2 text-xs h-auto"
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                            VERIFYING...
                        </>
                    ) : (
                        'VERIFY OTP'
                    )}
                </Button>
                {/* Resend Logic UI */}
                <div className="flex flex-col items-center gap-2">
                    {showResend ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onResendClick}
                            disabled={isResending}
                            className="text-[#a855f7] hover:text-[#d8b4fe] hover:bg-transparent text-[8px] font-bold"
                            style={{ fontFamily: '"Press Start 2P", cursive' }}
                        >
                            {isResending ? (
                                <>
                                    <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                                    RESENDING...
                                </>
                            ) : (
                                'RESEND OTP'
                            )}
                        </Button>
                    ) : (
                        <div className="text-center">
                            <p className="text-[8px] text-white/50" style={{ fontFamily: '"Press Start 2P", cursive' }}>{`Didn't receive the code?`}</p>
                            <p className="text-[8px] font-medium text-white mt-1" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                                Resend in {formatCountdown(countdown)}
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </RetroWindowWrapper>
    );
}
