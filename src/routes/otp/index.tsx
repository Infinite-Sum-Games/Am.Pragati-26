import { createFileRoute } from "@tanstack/react-router";
import RetroWindowWrapper from "@/components/RetroWindowWrapper";
import { OtpVerificationForm } from "@/features/otp/OtpVerificationForm";

const pixelFont = {
	fontFamily: '"Press Start 2P", cursive',
};

export const Route = createFileRoute("/otp/")({
	component: OtpPage,
});

function OtpPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-[url('/generated_login_bg.png')] bg-cover bg-center bg-no-repeat fixed w-full h-full">
			<div className="absolute inset-0 bg-black opacity-70"></div>
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
			<RetroWindowWrapper className="max-w-md" title="">
				<div className="flex flex-col items-center space-y-3 pt-3 mb-6">
					<div className="space-y-4 text-center">
						<div className="space-y-1">
							<h1
								className="text-2xl font-bold tracking-widest text-white"
								style={pixelFont}
							>
								VERIFY YOUR ACCOUNT
							</h1>
						</div>

						<div className="space-y-8 px-2">
							<p
								className="text-xs text-[#a855f7] leading-relaxed"
								style={pixelFont}
							>
								ENTER THE 6 DIGIT VERIFICATION CODE
							</p>

							<p
								className="text-[8px] text-white/50 leading-relaxed"
								style={pixelFont}
							>
								<span className="font-medium">CAN'T FIND THE EMAIL?</span>
								<br />
								PLEASE CHECK YOUR SPAM OR JUNK FOLDER
							</p>
						</div>
					</div>
				</div>
				<OtpVerificationForm />
			</RetroWindowWrapper>
		</div>
	);
}
