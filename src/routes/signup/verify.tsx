import { createFileRoute } from "@tanstack/react-router";
import RetroWindowWrapper from "@/components/RetroWindowWrapper";
import { OtpVerificationForm } from "@/features/otp/OtpVerificationForm"; // Re-using the general OtpVerificationForm

const pixelFont = {
	fontFamily: '"Press Start 2P", cursive',
};

export const Route = createFileRoute("/signup/verify")({
	component: SignupOtpVerificationPage,
});

function SignupOtpVerificationPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-[url('/generated_login_bg.png')] bg-cover bg-center bg-no-repeat fixed w-full h-full">
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
			<RetroWindowWrapper className="max-w-md">
				<div className="flex flex-col items-center space-y-3 pt-3">
					<div className="space-y-4 text-center">
						<div className="space-y-1">
							<h1
								className="text-2xl font-bold tracking-widest text-white"
								style={pixelFont}
							>
								VERIFY YOUR ACCOUNT
							</h1>
						</div>

						<div className="space-y-3 px-2">
							<p
								className="text-sm text-white/80 leading-relaxed"
								style={pixelFont}
							>
								{`WE'VE SENT A `}
								<span className="font-semibold text-[#a855f7]">
									6-DIGIT VERIFICATION CODE
								</span>
								{` TO YOUR EMAIL`}
							</p>

							<p
								className="text-xs text-white/50 leading-relaxed"
								style={pixelFont}
							>
								<span className="font-medium">CAN'T FIND THE EMAIL?</span>
								<br />
								PLEASE CHECK YOUR SPAM OR JUNK FOLDER
							</p>
						</div>
					</div>
				</div>
				{/* The OtpVerificationForm internally uses useSignupOtpVerification and useOtpCountdownTimer with 'signupResendStartTime' */}
				<OtpVerificationForm />
			</RetroWindowWrapper>
		</div>
	);
}
