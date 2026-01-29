import { motion } from "framer-motion";

const Card = (props: {
	name: string;
	img: string;
	extraStyling?: string;
	appearDelay?: number;
	animationDuration?: number;
}) => {
	const { name, img, extraStyling, appearDelay, animationDuration } = props;
	return (
		<motion.div
			initial={{ translateY: 120, opacity: 0 }}
			animate={{ translateY: 0, opacity: 1 }}
			transition={{
				duration: animationDuration ?? 1,
				ease: "easeInOut",
				delay: appearDelay ?? 1,
			}}
			className="scale-90 w-100 h-59 object-cover relative bg-[url(sponsors-page/card.png)] bg-cover bg-no-repeat flex flex-col justify-center items-center overflow-visible"
		>
			<p className="absolute -top-20 left-1/2 -translate-x-1/2 z-20 text-6xl text-[#f4d03e] text-shadow-[2px_2px_0px_#7b3aec] font-jersey text-center whitespace-nowrap">
				{name}
			</p>

			<img
				src={img}
				alt={name}
				className={`z-20 rounded-xl w-full h-full object-cover p-8 ${extraStyling ?? ""}`}
			/>
		</motion.div>
	);
};

export default Card;
