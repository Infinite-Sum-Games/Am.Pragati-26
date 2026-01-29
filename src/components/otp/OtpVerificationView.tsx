import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import type { OtpProps } from "@/types/otpTypes";

const otpSlots = ["a", "b", "c", "d", "e", "f"];
function formatCountdown(seconds: number): string {
	const mins = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0");
	const secs = (seconds % 60).toString().padStart(2, "0");
	return `${mins}:${secs}`;
}

const pixelFont = {
	fontFamily: '"Press Start 2P", cursive',
};

export function OtpVerificationView({
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
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
			className="flex flex-col items-center gap-4"
		>
			<div className="flex flex-col items-center gap-3">
				<InputOTP
					maxLength={6}
					value={otp}
					onChange={(val: string) => {
						const numeric = val.replace(/\D/g, "");
						onOtpChange(numeric);
					}}
					disabled={isSubmitting}
					pattern="\d*"
				>
					<InputOTPGroup>
						{otpSlots.map((key, i) => (
							<InputOTPSlot
								key={key}
								index={i}
								className="w-10 h-10 sm:w-12 sm:h-12 text-lg font-medium border-2 rounded-lg bg-black/40 border-[#7e22ce]/40 text-white focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 mx-0.5"
								style={pixelFont}
							/>
						))}
					</InputOTPGroup>
				</InputOTP>
			</div>
			{error && (
				<p
					className="text-sm text-red-500 text-center font-medium"
					style={pixelFont}
				>
					{error}
				</p>
			)}

			<Button
				type="submit"
				disabled={otp.length !== 6 || isSubmitting}
				className="w-full h-11 text-base bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold py-2 text-xs"
				style={pixelFont}
			>
				{isSubmitting ? (
					<>
						<Loader2 className="h-4 w-4 mr-2 animate-spin" />
						VERIFYING...
					</>
				) : (
					"VERIFY OTP"
				)}
			</Button>

			<div className="flex flex-col items-center gap-2">
				{showResend ? (
					<Button
						type="button"
						variant="link"
						size="sm"
						onClick={onResendClick}
						disabled={isResending}
						className="text-[#a855f7] hover:text-[#d8b4fe] font-medium text-xs"
						style={pixelFont}
					>
						{isResending ? (
							<>
								<Loader2 className="h-4 w-4 mr-2 animate-spin" />
								RESENDING...
							</>
						) : (
							"RESEND OTP"
						)}
					</Button>
				) : (
					<div className="text-center">
						<p
							className="text-sm text-white/50"
							style={pixelFont}
						>{`DIDN'T RECEIVE THE CODE?`}</p>
						<p className="text-sm font-medium text-white" style={pixelFont}>
							RESEND IN {formatCountdown(countdown)}
						</p>
					</div>
				)}
			</div>
		</form>
	);
}
