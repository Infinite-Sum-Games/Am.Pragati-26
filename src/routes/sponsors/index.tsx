import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Card from "@/components/sponsors/Card";
import Noise from "@/components/sponsors/Noise";
import "./style.css";

export const Route = createFileRoute("/sponsors/")({
	component: SponsorsPage,
});

function SponsorsPage() {
	return (
		<>
			<Navbar />

			<section className="relative w-screen min-h-screen bg-black select-none">
				{/* Foreground content */}
				<div className="relative z-10 w-full min-h-screen bg-black/30 backdrop-blur-[5px] flex flex-col items-center pt-24">
					{/* Noise overlay */}
					<div className="absolute inset-0 pointer-events-none">
						<Noise
							patternSize={50}
							patternScaleX={10}
							patternScaleY={10}
							patternRefreshInterval={2}
							patternAlpha={25}
						/>
					</div>

					{/* Page Title */}
					<motion.h1
						initial={{ translateY: 120, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
						className="z-20 mb-5 text-[#f4d03e] text-8xl font-jersey
              text-shadow-[4px_4px_0px_#7b3aec] max-sm:text-7xl"
					>
						Our Sponsors
					</motion.h1>

					{/* Title Sponsor */}
					<motion.p
						initial={{ translateY: 120, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
						className="z-20 mt-10 mb-20 text-[#33EBFF] text-5xl font-jersey
              text-shadow-[2px_2px_0px_#7b3aec] max-lg:mb-12"
					>
						Title Sponsor – BNY
					</motion.p>

					{/* === TITLE SPONSOR CARD === */}
					<motion.div
						initial={{ translateY: 120, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
						className="relative w-full max-w-6xl px-6 mb-28"
					>
						<div className="relative w-full">
							{/* Desktop */}
							<img
								src="sponsors-page/card-long.png"
								alt="Sponsor Card Desktop"
								className="hidden lg:block w-full h-auto"
							/>

							{/* Tablet */}
							<img
								src="sponsors-page/card-med.png"
								alt="Sponsor Card Tablet"
								className="hidden md:block lg:hidden w-full h-auto"
							/>

							{/* Mobile - CSS styled card that matches Other Sponsors cards */}
							<div className="block md:hidden w-full bg-[url(/sponsors-page/card.png)] bg-center bg-cover bg-no-repeat py-[16%] px-[16%]">
								<div className="flex flex-col items-center gap-4 text-center">
									{/* Logo */}
									<img
										src="sponsors-page/bny.jpeg"
										alt="BNY Logo"
										className="w-28 h-auto object-contain rounded-xl"
									/>

									{/* Text */}
									<div className="flex flex-col gap-3">
										<p className="text-white font-jersey leading-[1.75] text-base">
											BNY is a global financial services platform company and
											the world's largest custodian bank. Founded in 1784 by
											Alexander Hamilton, BNY supports how capital moves,
											settles, and stays secure across markets. At its core, BNY
											provides the infrastructure for safekeeping assets,
											processing transactions, and supporting clients across the
											full investment lifecycle.
										</p>

										<p className="text-white font-jersey leading-[1.75] text-base">
											Amrita School of Business shares a strong and growing
											association with BNY. Over the years, BNY has supported
											Amrita students through meaningful internship
											opportunities and continues its support as the title
											sponsor for Pragati'25 and Pragati'26.
										</p>
									</div>
								</div>
							</div>

							{/* CONTENT LAYER - for tablet/desktop only */}
							<div className="hidden md:flex absolute inset-0 flex-col lg:flex-row items-center justify-center text-center lg:text-left">
								{/* SAFE CONTENT FRAME */}
								<div
									className="
                    w-full h-full
                    flex flex-col lg:flex-row
                    items-center justify-center
                    gap-4 lg:gap-8
                    md:px-[10%] md:py-[10%]
                    lg:px-[12%] lg:py-[12%]
                  "
								>
									{/* Logo */}
									<img
										src="sponsors-page/bny.jpeg"
										alt="BNY Logo"
										className="w-36 lg:w-52 h-auto object-contain rounded-xl shrink-0"
									/>

									{/* Text */}
									<div className="flex flex-col gap-3 max-w-[90%] mx-auto">
										<p
											className="text-white font-jersey leading-[1.75]
                      text-base md:text-base lg:text-xl"
										>
											BNY is a global financial services platform company and
											the world's largest custodian bank. Founded in 1784 by
											Alexander Hamilton, BNY supports how capital moves,
											settles, and stays secure across markets. At its core, BNY
											provides the infrastructure for safekeeping assets,
											processing transactions, and supporting clients across the
											full investment lifecycle.
										</p>

										<p
											className="text-white font-jersey leading-[1.75]
                      text-base md:text-base lg:text-xl"
										>
											Amrita School of Business shares a strong and growing
											association with BNY. Over the years, BNY has supported
											Amrita students through meaningful internship
											opportunities and continues its support as the title
											sponsor for Pragati'25 and Pragati'26.
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Other Sponsors */}
					<motion.p
						initial={{ translateY: 120, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 1, ease: "easeInOut", delay: 1.4 }}
						className="z-20 mt-16 mb-8 text-[#E6E6FA] text-5xl font-jersey
              text-shadow-[2px_2px_0px_#7b3aec]"
					>
						Other Sponsors
					</motion.p>

					<div className="w-full px-10 py-8 pb-20 flex flex-col md:flex-row flex-wrap justify-center items-center gap-8">
						<Card
							name="Banconus"
							img="sponsors-page/banconus.jpeg"
							extraStyling=""
							appearDelay={1.6}
						/>
						<Card
							name="Welspun BAPL"
							img="sponsors-page/new_sponser.jpeg"
							extraStyling="!w-[90%] md:!w-[95%] bg-[#2d1b4e] p-10 rounded-lg"
							appearDelay={1.8}
						/>
					</div>
				</div>

				{/* Desktop background video */}
				<video
					className="hidden lg:block fixed inset-0 z-0 w-screen h-screen object-cover"
					autoPlay
					loop
					muted
				>
					<source src="sponsors-page/bg-night.webm" type="video/webm" />
				</video>

				{/* Mobile / Tablet background video */}
				<video
					className="lg:hidden fixed inset-0 z-0 w-screen h-screen object-cover"
					autoPlay
					loop
					muted
				>
					<source src="sponsors-page/bg-night-mobile.webm" type="video/mp4" />
				</video>
			</section>
		</>
	);
}

export default SponsorsPage;
