import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const row1Images = [
	{
		id: 1,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2d7BKaXqlYhxmf7KGgre3XpuStqMobiV20vwEP",
		colorClass: "bg-pink-500",
	},
	{
		id: 2,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dfoFgyzGplW6poDmg0S2QcJRTnOuCVNIvrhy3",
		colorClass: "bg-cyan-400",
	},
	{
		id: 3,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dr4k0eY7Ik0EquVt93CSAfJZWnU6oPLicjdwB",
		colorClass: "bg-yellow-400",
	},
	{
		id: 4,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dxsIHPp9qmkLjxWTSrivIXcEayYdpN042nVP3",
		colorClass: "bg-fuchsia-600",
	},
	{
		id: 5,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dCKxhFRnFibrWxX19qfQAl5hUtSpOZdYPHBTu",
		colorClass: "bg-teal-400",
	},
	{
		id: 6,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dPZq3Bz82Z9EReKUJkN5aMnizyGI867ohdxsB",
		colorClass: "bg-violet-500",
	},
];

const row2Images = [
	{
		id: 7,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dvD87wfLS9FVewDazNbv0GZsxmLOE1qQCTko5",
		colorClass: "bg-cyan-400",
	},
	{
		id: 8,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2d4AfbaAtmsB9OpjxvbnPLVaK0QzAdt3GlTZku",
		colorClass: "bg-pink-500",
	},
	{
		id: 9,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2df3gPn0plW6poDmg0S2QcJRTnOuCVNIvrhy3P",
		colorClass: "bg-yellow-400",
	},
	{
		id: 10,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dYT2YVQU7WUPVbFermhXvNkzuATfp082CGJEg",
		colorClass: "bg-fuchsia-600",
	},
	{
		id: 11,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dtLCBJBYQKTH6FGEzS45DoUdrxWCtVmafvOP2",
		colorClass: "bg-teal-400",
	},
	{
		id: 12,
		src: "https://cemmqkyp6r.ufs.sh/f/ARrrFNxAQO2dTyx0yPWGP1qdZ6LDschUoWjxbKy0EM5QAVf3",
		colorClass: "bg-violet-500",
	},
];

type Phase = "loading" | "exploding" | "complete";
type ImageType = (typeof row1Images)[0];

const DISCO_COLOR_CLASSES = [
	"bg-pink-500",
	"bg-yellow-400",
	"bg-cyan-400",
	"bg-fuchsia-600",
	"bg-teal-400",
	"bg-violet-500",
];

function ColorfulDiscoBall({ phase }: { phase: Phase }) {
	return (
		<motion.div
			className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-25 md:h-25"
			style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
			animate={
				phase === "exploding"
					? { scale: [1, 1.8, 0], rotateY: 720, rotateX: 360 }
					: { rotateY: 360 }
			}
			transition={
				phase === "exploding"
					? { duration: 1, ease: [0.23, 1, 0.32, 1] }
					: { duration: 5, repeat: Infinity, ease: "linear" }
			}
		>
			<div
				className="absolute w-full h-full"
				style={{ transformStyle: "preserve-3d" }}
			>
				{[...Array(8)].map((_, lat) =>
					[...Array(16)].map((_, lon) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: lat and lon are stable indices for disco ball panels
							key={`${lat}-${lon}`}
							className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 left-1/2 top-1/2 -ml-1 -mt-1 rounded-sm ${DISCO_COLOR_CLASSES[(lat + lon) % 6]} animate-pulse shadow-lg`}
							style={{
								transform: `rotateY(${lon * 22.5}deg) rotateX(${lat * 22.5 - 90}deg) translateZ(40px)`,
							}}
						/>
					)),
				)}
			</div>
			<div className="absolute -inset-8 rounded-full opacity-50 blur-3xl bg-gradient-conic from-pink-500 via-teal-400 to-violet-500 animate-spin" />
		</motion.div>
	);
}

function ExplosionParticles({ active }: { active: boolean }) {
	if (!active) return null;

	return (
		<div className="absolute">
			{[...Array(24)].map((_, i) => {
				const angle = (i / 24) * Math.PI * 2;
				const velocity = 120 + Math.random() * 150;
				return (
					<motion.div
						// biome-ignore lint/suspicious/noArrayIndexKey: static explosion particles
						key={i}
						className={`absolute rounded-full w-2 h-2 sm:w-3 sm:h-3 ${DISCO_COLOR_CLASSES[i % 6]} shadow-lg`}
						initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
						animate={{
							x: Math.cos(angle) * velocity,
							y: Math.sin(angle) * velocity,
							scale: [1, 1.5, 0],
							opacity: [1, 1, 0],
						}}
						transition={{
							duration: 0.8,
							delay: Math.random() * 0.15,
							ease: "easeOut",
						}}
					/>
				);
			})}
		</div>
	);
}

const getImageAnimationParams = (id: number) => {
	const seed = id * 1.618033988749895;
	return {
		rotation: -4 + (seed % 8),
		swingDelay: (seed * 0.7) % 2,
		swingDuration: 3 + ((seed * 0.5) % 2),
	};
};

function PolaroidCard({
	image,
	cardRef,
}: {
	image: ImageType;
	cardRef: (el: HTMLDivElement | null) => void;
}) {
	const { rotation, swingDelay, swingDuration } = getImageAnimationParams(
		image.id,
	);

	return (
		<div
			ref={cardRef}
			className="shrink-0 group relative pt-6 polaroid-card will-change-transform"
			data-color-class={image.colorClass}
			style={{
				transformOrigin: "top center",
				backfaceVisibility: "hidden",
				WebkitBackfaceVisibility: "hidden",
			}}
		>
			<motion.div
				animate={{
					rotate: [-4, 4, -4],
				}}
				transition={{
					duration: swingDuration,
					repeat: Infinity,
					ease: "easeInOut",
					delay: swingDelay,
				}}
				style={{ transformOrigin: "top center" }}
			>
				<div
					className="thread-container absolute left-1/2 -translate-x-1/2 z-10"
					style={{
						top: "calc(-3.5rem - var(--thread-extra, 0px) - var(--thread-scale-compensation, 0px))",
						height:
							"calc(4.5rem + var(--thread-extra, 0px) + var(--thread-scale-compensation, 0px))",
					}}
				>
					<div className="w-0.5 h-full bg-amber-700 rounded-full" />
				</div>

				<motion.div
					className="relative group-hover:z-50 polaroid-frame"
					style={{ transform: `rotate(${rotation}deg)` }}
					whileHover={{ rotate: 0, scale: 1.05 }}
				>
					<div
						className="p-2 sm:p-3 shadow-xl w-48 sm:w-56 md:w-64 lg:w-72 relative pt-4 sm:pt-5"
						style={{
							backgroundColor: "#e8dcc8",
							boxShadow:
								"inset 0 0 20px rgba(139, 90, 43, 0.15), 0 4px 20px rgba(0,0,0,0.3)",
						}}
					>
						<div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
							<div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
							<div className="absolute inset-0 rounded-full border border-gray-300" />
						</div>

						<div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rotate-45">
							<div className="relative">
								<div className="w-5 h-3 sm:w-6 sm:h-4 relative">
									<div
										className="absolute left-0 top-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 sm:border-[3px] bg-transparent"
										style={{ borderColor: "#b45309" }}
									/>
									<div
										className="absolute right-0 top-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 sm:border-[3px] bg-transparent"
										style={{ borderColor: "#d97706" }}
									/>
									<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-linear-to-br from-amber-500 via-amber-700 to-amber-900 shadow-sm" />
								</div>
							</div>
						</div>

						<div className="relative aspect-4/3 overflow-hidden bg-gray-900 mt-3 sm:mt-4">
							<img
								src={image.src}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
						</div>
					</div>
					<div className="absolute -bottom-4 left-[10%] right-[10%] h-4 sm:h-6 blur-lg opacity-50 bg-gradient-radial from-black/40 to-transparent" />
				</motion.div>
			</motion.div>
		</div>
	);
}

function InfiniteScrollRow({
	images,
	direction,
}: {
	images: ImageType[];
	direction: "left" | "right";
}) {
	const duplicatedImages = [...images, ...images, ...images];
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const positionRef = useRef(direction === "left" ? 0 : -33.33);
	const animationRef = useRef<number | undefined>(undefined);
	  const containerCacheRef = useRef<{
    centerX: number;
    maxDistance: number;
  } | null>(null);
  const isAnimating = useRef(false);

	useEffect(() => {
		const updateContainerCache = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				containerCacheRef.current = {
					centerX: rect.left + rect.width / 2,
					maxDistance: rect.width / 2,
				};
			}
		};

		updateContainerCache();
		window.addEventListener("resize", updateContainerCache);
		return () => window.removeEventListener("resize", updateContainerCache);
	}, []);

	const updateScales = useCallback(() => {
		const cache = containerCacheRef.current;
		if (!cache) return;

		const cardCount = cardRefs.current.length;
		for (let i = 0; i < cardCount; i++) {
			const card = cardRefs.current[i];
			if (!card) continue;

			const cardRect = card.getBoundingClientRect();
			const cardCenterX = cardRect.left + cardRect.width / 2;

			const distanceFromCenter = Math.abs(cardCenterX - cache.centerX);
			const normalizedDistance = Math.min(
				distanceFromCenter / cache.maxDistance,
				1,
			);
			const scale = 1.15 - normalizedDistance * 0.6;
			const opacity = 1 - normalizedDistance * 0.4;
			const zIndex = Math.floor((1 - normalizedDistance) * 20);

			card.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1) translateZ(0)`;
			card.style.opacity = opacity.toFixed(4);
			card.style.zIndex = String(zIndex);

			const threadExtra = normalizedDistance * 60;
			const scaleCompensation = (1 - normalizedDistance) * 20;
			card.style.setProperty("--thread-extra", `${threadExtra.toFixed(2)}px`);
			card.style.setProperty(
				"--thread-scale-compensation",
				`${scaleCompensation.toFixed(2)}px`,
			);

			const frame = card.querySelector(".polaroid-frame > div") as HTMLElement;
			if (frame) {
				if (normalizedDistance < 0.3) {
					frame.classList.add("shadow-2xl");
					frame.classList.remove("shadow-xl");
				} else {
					frame.classList.add("shadow-xl");
					frame.classList.remove("shadow-2xl");
				}
			}
		}
	}, []);

	  useEffect(() => {
    const speed = 0.15;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (direction === "left") {
        positionRef.current -= speed * delta * 0.01;
        positionRef.current =
          ((positionRef.current % 33.33) + 33.33) % 33.33 - 33.33;
      } else {
        positionRef.current += speed * delta * 0.01;
        positionRef.current =
          ((positionRef.current % 33.33) + 33.33) % 33.33 - 33.33;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}%, 0, 0)`;
      }

      updateScales();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Prevent multiple animations in React StrictMode
    if (!isAnimating.current) {
      isAnimating.current = true;
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      isAnimating.current = false;
    };
  }, [direction, updateScales]);

	const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
		cardRefs.current[index] = el;
	};

	return (
		<div
			className="relative overflow-hidden py-8 sm:py-10 md:py-12"
			ref={containerRef}
		>
			<div className="absolute top-0 left-0 right-0 h-1 z-10 bg-linear-to-r from-transparent via-amber-700/90 to-transparent shadow-md" />

			<div
				ref={trackRef}
				className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-1 items-end w-fit"
			>
				{duplicatedImages.map((image, idx) => (
					<PolaroidCard
						key={`${image.id}-${idx}`}
						image={image}
						cardRef={setCardRef(idx)}
					/>
				))}
			</div>
		</div>
	);
}

export function GallerySection() {
	const [phase, setPhase] = useState<Phase>("loading");
	const [hasAnimated, setHasAnimated] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						setHasAnimated(true);
						const allImages = [...row1Images, ...row2Images];
						Promise.all(
							allImages.map(
								(img) =>
									new Promise((resolve) => {
										const image = new Image();
										image.src = img.src;
										image.onload = resolve;
										image.onerror = resolve;
									}),
							),
						).then(() => {
							setTimeout(() => setPhase("exploding"), 400);
							setTimeout(() => setPhase("complete"), 1400);
						});
					}
				});
			},
			{ threshold: 0.2 },
		);

		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, [hasAnimated]);

	return (
		<section
			ref={sectionRef}
			className="relative min-h-125 sm:min-h-150 md:min-h-175 lg:min-h-187.5 overflow-hidden py-8 sm:py-10 md:py-12 bg-gradient-to-b from-[#0c0c24] to-black"
		>
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static background particles
						key={i}
						className={`absolute w-1 h-1 rounded-full ${DISCO_COLOR_CLASSES[i % 6]} animate-pulse shadow-sm`}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${3 + Math.random() * 4}s`,
						}}
					/>
				))}
			</div>

			<AnimatePresence>
				{(phase === "loading" || phase === "exploding") && (
					<motion.div
						className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/95"
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
					>
						<ColorfulDiscoBall phase={phase} />
						<ExplosionParticles active={phase === "exploding"} />
						{phase === "loading" && (
							<motion.p
								className="mt-6 sm:mt-8 md:mt-10 text-xs sm:text-sm tracking-widest text-yellow-400/70"
								animate={{ opacity: [0.4, 1, 0.4] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								Loading Memories...
							</motion.p>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{phase === "complete" && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="relative z-10"
					>
						<motion.div
							className="text-center mb-4 sm:mb-5 md:mb-6 px-4"
							initial={{ y: -30, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-700">
								Moments That Shine
							</h2>
						</motion.div>

						<div className="space-y-4 sm:space-y-5 md:space-y-6">
							<InfiniteScrollRow images={row1Images} direction="left" />
							<InfiniteScrollRow images={row2Images} direction="right" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}

export default GallerySection;
