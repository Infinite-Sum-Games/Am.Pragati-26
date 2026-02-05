import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

// Helper component for the Typewriter effect
const TypewriterText = ({ text }: { text: string }) => {
	const letters = Array.from(text);

	const container = {
		hidden: { opacity: 0 },
		visible: (_i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.05, delayChildren: 1.5 },
		}),
	};

	const child = {
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring" as const, damping: 12, stiffness: 100 },
		},
		hidden: {
			opacity: 0,
			y: 10,
		},
	};

	return (
		<motion.div
			style={{ display: "flex" }}
			variants={container}
			initial="hidden"
			animate="visible"
			className="font-vcr text-retro-cyan text-sm md:text-xl tracking-[0.2em] md:tracking-[0.5em] uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
		>
			{letters.map((letter) => (
				<motion.span variants={child} key={`${letter}-${Math.random()}`}>
					{letter === " " ? "\u00A0" : letter}
				</motion.span>
			))}
		</motion.div>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: reason
const SponsorBadge = ({ title, logo, color, borderColor }: any) => (
	<div className="flex flex-col items-center group cursor-default">
		<div className="flex items-center gap-2 mb-1">
			<div
				className={`h-0.5 w-3 md:w-6 ${color} shadow-[0_0_10px_currentColor]`}
			/>
			<span
				className={`font-vcr text-[9px] md:text-xs ${color} tracking-widest drop-shadow-[0_0_5px_currentColor] whitespace-nowrap`}
			>
				{title}
			</span>
		</div>
		<div
			className={`relative p-1.5 md:p-2 bg-black/30 border-l-2 ${borderColor} backdrop-blur-sm rounded-tr-lg`}
		>
			<img
				src={logo}
				alt={title}
				className="h-6 md:h-10 w-auto object-contain drop-shadow-md"
			/>
			<div
				className={`absolute top-0 right-0 w-1 h-1 md:w-1.5 md:h-1.5 ${color.replace("text-", "bg-")}`}
			/>
		</div>
	</div>
);

function HeroSection() {
	const stats = [
		{ label: "EVENTS", value: "30+" },
		{ label: "PARTICIPANTS", value: "500+" },
		{ label: "COLLEGES", value: "15+" },
	];
	const navigate = useNavigate();

	return (
		<section className="relative min-h-screen h-screen max-w-screen w-full flex flex-col items-center overflow-hidden">
			{/* Background Image */}
			<div
				className="absolute inset-0 z-0 bg-cover bg-position-[center_top] md:bg-center bg-no-repeat"
				style={{
					backgroundImage:
						"url('https://speugdv1vi.ufs.sh/f/y8q1VPJuKeA1E0kiecIJlYT70Xc54kS3CBuQrR9HEGawoFDn')",
				}}
			>
				<div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/20 md:hidden pointer-events-none" />
			</div>

			{/* DESKTOP SPONSORS (Hidden on Mobile) */}
			<div className="hidden md:flex absolute top-0 left-0 z-30 w-full max-w-2xl p-8 flex-row items-center gap-8">
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
				>
					<SponsorBadge
						title="ORGANIZED BY"
						logo="/logos/ASB.webp"
						color="text-retro-pink"
						borderColor="border-retro-pink/50"
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.7 }}
				>
					<SponsorBadge
						title="TITLE SPONSOR"
						logo="/logos/BNY.webp"
						color="text-retro-cyan"
						borderColor="border-retro-cyan/50"
					/>
				</motion.div>
			</div>

			{/* MAIN CONTENT CONTAINER */}
			<div className="relative z-10 flex flex-col items-center w-full h-full justify-center md:justify-between md:pt-28">
				{/* Inner Content Wrapper */}
				<div className="flex flex-col items-center w-full">
					{/* MOBILE SPONSORS (Visible only on Mobile) */}
					<div className="flex md:hidden flex-row gap-4 mb-4 z-20">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<SponsorBadge
								title="ORGANIZED BY"
								logo="/logos/ASB.webp"
								color="text-retro-pink"
								borderColor="border-retro-pink/50"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<SponsorBadge
								title="TITLE SPONSOR"
								logo="/logos/BNY.webp"
								color="text-retro-cyan"
								borderColor="border-retro-cyan/50"
							/>
						</motion.div>
					</div>

					{/* Title Section */}
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
						className="relative flex-none text-center"
					>
						<h1 className="font-jersey15 text-[90px] md:text-[160px] lg:text-[200px] xl:text-[240px] text-retro-yellow drop-shadow-[3px_3px_0px_rgba(168,85,247,0.8)] md:drop-shadow-[4px_4px_0px_rgba(168,85,247,0.8)] tracking-tighter uppercase leading-none select-none">
							Pragati '26
						</h1>

						<motion.img
							src="/radience-text.png"
							alt="Radiance"
							className="absolute -bottom-7 -right-4 w-32 md:w-64 lg:w-96 md:-bottom-10 md:-right-10 lg:-bottom-16 lg:-right-20 transform -rotate-3 filter drop-shadow-lg pointer-events-none"
							initial={{ scale: 0, rotate: -10 }}
							animate={{ scale: 1, rotate: -3 }}
							transition={{ delay: 0.3, type: "spring" }}
						/>
					</motion.div>

					{/* Typewriter Filler Text */}
					<div className="mt-12 md:mt-16 flex flex-col items-center justify-center">
						<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 rounded-lg px-4 py-3 md:px-8 md:py-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
							<TypewriterText text="PRESS EXPLORE TO UNLOCK" />
							<div className="h-2" />
							<TypewriterText text="THE ULTIMATE EXPERIENCE" />
						</div>
					</div>

					{/* CTA Button */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 2.5, duration: 0.5 }}
						className="mt-6 md:mt-8 flex-none mb-4"
					>
						<motion.button
							whileHover={{ y: -2 }}
							whileTap={{ y: 2 }}
							className="pointer-events-auto relative px-8 py-3 md:px-10 md:py-4 
                           bg-[#7c3aed] border-2 border-black text-white 
                           font-vcr font-bold text-xl md:text-2xl uppercase tracking-wider 
                           shadow-[4px_4px_0_rgba(0,0,0,1)] 
                           hover:bg-[#6d28d9] 
                           active:shadow-none active:translate-x-1 active:translate-y-1 
                           transition-all flex items-center gap-2 cursor-pointer"
							onClick={() => navigate({ to: "/events" })}
						>
							Explore Events
						</motion.button>
					</motion.div>
				</div>

				{/* BOTTOM STATS SECTION */}
				<motion.div
					className="flex-none w-full justify-end max-w-sm md:max-w-none grid grid-cols-3 gap-3 md:flex md:flex-wrap md:justify-center md:gap-16 px-4 mt-8 md:mt-0 pb-6 md:pb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9, duration: 0.5 }}
				>
					{stats.map((stat) => (
						<div key={stat.label} className="flex flex-col items-center group">
							<div className="relative w-full bg-black/40 border md:border-2 border-retro-cyan/50 p-2 md:p-5 rounded-sm backdrop-blur-sm group-hover:border-retro-pink group-hover:-translate-y-2 transition-all duration-300">
								<span className="font-jersey15 text-3xl md:text-6xl text-white drop-shadow-[1px_1px_0px_#00ffff] md:drop-shadow-[2px_2px_0px_#00ffff] flex justify-center">
									{stat.value}
								</span>

								<div className="absolute -top-1 -left-1 w-1 h-1 md:w-1.5 md:h-1.5 bg-retro-cyan group-hover:bg-retro-pink" />
								<div className="absolute -bottom-1 -right-1 w-1 h-1 md:w-1.5 md:h-1.5 bg-retro-cyan group-hover:bg-retro-pink" />
							</div>
							<span className="mt-2 font-vcr text-[10px] md:text-base text-retro-cyan tracking-widest bg-black/60 px-2 py-1 rounded w-full md:w-auto text-center">
								{stat.label}
							</span>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

export default HeroSection;
