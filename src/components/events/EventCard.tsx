import { motion } from "framer-motion";
import { Calendar, CheckCircle, Lock, Star, Users, Zap } from "lucide-react";
import { useState } from "react";
import type { Event } from "@/types/eventTypes";

const formatDateOnly = (dateInput: string | Date | undefined) => {
	if (!dateInput) return "";
	const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
	if (Number.isNaN(d.getTime())) return String(dateInput);
	return d.toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const formatCurrency = (amount: number) => {
	return `₹${amount.toLocaleString("en-IN")}`;
};

interface EventCardProps {
	event: Event;
	onStarToggle?: (eventId: string) => void;
	onCardClick?: (eventId: string) => void;
	isStarLoading?: boolean;
}

export const EventCard = ({
	event,
	onStarToggle,
	onCardClick,
	isStarLoading = false,
}: EventCardProps) => {
	const {
		event_id,
		event_image_url,
		event_name,
		event_status,
		event_date,
		is_group,
		is_filling_fast,
		tags,
		event_price,
		is_registered,
		isStarred,
		is_full,
	} = event;

	// Use fallback image if event_image_url is null, empty, or invalid
	const displayImageUrl =
		event_image_url && event_image_url.trim() !== ""
			? event_image_url
			: "/Images/comingsoon.jpg";

	const isEventClosed =
		!is_registered && (event_status.toLowerCase() === "completed" || is_full);

	const [isHovered, setIsHovered] = useState(false);

	const handleStarToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isEventClosed && onStarToggle) {
			onStarToggle(event_id);
		}
	};

	const handleCardClick = () => {
		if (!isEventClosed && onCardClick) {
			onCardClick(event_id);
		}
	};

	const getTagLabel = (tag: string) => tag || "";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={`group relative w-full aspect-3/5 ${
				isEventClosed ? "cursor-not-allowed" : "cursor-pointer"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleCardClick}
		>
			<div
				className={`absolute -inset-2 bg-linear-to-br from-orange-500/25 via-pink-500/20 to-yellow-500/15 rounded blur-xl transition-opacity duration-500 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}
			/>

			<div
				className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.6)] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.6)] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.6)] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>
			<div
				className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.6)] z-20 transition-all duration-300 
                md:opacity-0 md:w-4 md:h-4 md:group-hover:opacity-100 md:group-hover:w-6 md:group-hover:h-6"
			/>

			<div className="absolute top-3 left-3 z-30 md:hidden">
				{is_registered ? (
					<div className="px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border-2 border-retro-cyan/80 text-retro-cyan flex items-center gap-1.5 text-xs font-vcr shadow-lg shadow-retro-cyan/30">
						<CheckCircle className="h-3 w-3" />
						REGISTERED
					</div>
				) : isEventClosed ? (
					<div className="px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border-2 border-gray-500/80 text-gray-400 flex items-center gap-1.5 text-xs font-vcr shadow-lg">
						<Lock className="w-3 h-3" />
						CLOSED
					</div>
				) : null}
			</div>

			<div
				className={`
                    relative w-full h-full rounded-none overflow-hidden flex flex-col
                    bg-linear-to-br from-black via-gray-950 to-black backdrop-blur-md
                    border-2 transition-all duration-300 ease-out
                    ${
											isHovered
												? "border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.6),0_0_60px_rgba(236,72,153,0.4)]"
												: "border-gray-800/60 shadow-[0_0_15px_rgba(249,115,22,0.2)] md:border-gray-800/40"
										}
                    ${isEventClosed ? "opacity-60 grayscale" : ""}
                `}
				style={{
					boxShadow: isHovered
						? "0 0 30px rgba(249,115,22,0.6), 0 0 60px rgba(236,72,153,0.4), inset 0 0 40px rgba(249,115,22,0.15)"
						: "0 0 15px rgba(249,115,22,0.2), inset 0 0 30px rgba(249,115,22,0.08)",
				}}
			>
				<div className="relative w-full h-[75%] overflow-hidden bg-linear-to-b from-orange-950/30 via-black/50 to-black/70">
					<div
						className={`
                            absolute inset-0 bg-cover bg-top origin-top transition-all duration-500 ease-out
                            ${isHovered ? "scale-105 brightness-110" : "scale-100"}
                        `}
						style={{ backgroundImage: `url(${displayImageUrl})` }}
					/>

					<div
						className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
							isHovered ? "opacity-50" : "opacity-25"
						}`}
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(249,115,22,0.12) 2px, rgba(249,115,22,0.12) 3px, transparent 3px, transparent 5px, rgba(236,72,153,0.08) 5px, rgba(236,72,153,0.08) 6px)",
						}}
					/>

					<div
						className={`
                            absolute inset-0 bg-linear-to-t from-orange-600/20 via-pink-600/15 to-yellow-500/10
                            transition-opacity duration-500 ease-out
                            opacity-0 md:group-hover:opacity-100
                        `}
					/>

					<div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

					{is_filling_fast && !is_full && (
						<div className="absolute bottom-3 right-3 z-40">
							<motion.div
								animate={{
									boxShadow: [
										"0 0 10px rgba(239,68,68,0.5)",
										"0 0 20px rgba(239,68,68,0.8)",
										"0 0 10px rgba(239,68,68,0.5)",
									],
								}}
								transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
								className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-red-900/80 backdrop-blur-md border-2 border-red-500 text-xs font-vcr text-red-200"
							>
								<Zap className="w-3 h-3 text-red-200" />
								FILLING FAST
							</motion.div>
						</div>
					)}
				</div>

				<div
					className={`
                        absolute top-0 left-0 right-0 h-[80%] 
                        bg-linear-to-b from-black/95 via-gray-950/93 to-black/95 backdrop-blur-md
                        flex flex-col justify-center items-center p-6 border-2 border-orange-500/80
                        shadow-[inset_0_0_60px_rgba(249,115,22,0.25),inset_0_0_30px_rgba(236,72,153,0.15)]
                        transition-opacity duration-300 ease-out md:flex
                        ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}
				>
					{is_registered ? (
						<div className="px-6 py-3 bg-black/70 border-2 border-retro-cyan text-retro-cyan flex items-center gap-2 text-sm font-vcr backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.5)]">
							<CheckCircle className="h-4 w-4" />
							REGISTERED
						</div>
					) : isEventClosed ? (
						<div className="px-6 py-3 bg-black/70 border-2 border-gray-500 text-gray-400 flex items-center gap-2 text-sm font-vcr backdrop-blur-sm">
							<Lock className="w-4 h-4" />
							CLOSED
						</div>
					) : (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-6 py-3 font-vcr text-sm bg-black/80 border-2 border-orange-400 text-orange-400 
                                hover:bg-orange-500/20 hover:shadow-[0_0_25px_rgba(251,146,60,0.7)] 
                                transition-all duration-300 backdrop-blur-sm uppercase"
						>
							REGISTER NOW
						</motion.button>
					)}
				</div>

				<button
					type="button"
					disabled={isEventClosed || isStarLoading}
					onClick={handleStarToggle}
					className={`
                        absolute top-3 right-3 z-30 p-2 backdrop-blur-md
                        border-2 transition-all duration-300 
                        ${
							isEventClosed
								? "cursor-default opacity-50"
								: "hover:scale-110 cursor-pointer"
							}
                        ${
							isStarred
								? "bg-retro-yellow/20 border-retro-yellow shadow-[0_0_15px_rgba(244,208,63,0.6)]"
								: `bg-black/70 border-gray-500 ${isEventClosed ? "" : "hover:bg-black/90 hover:border-retro-yellow"}`
						}
                    `}
				>
					<Star
						className={`w-4 h-4 transition-all duration-300 ${
							isStarred
								? "text-retro-yellow fill-retro-yellow drop-shadow-[0_0_5px_rgba(244,208,63,0.8)]"
								: "text-gray-400 hover:text-retro-yellow"
						}`}
					/>
				</button>

				<div className="relative flex-1 w-full bg-linear-to-b from-gray-950/95 via-black/95 to-black/98 border-t-2 border-orange-500/60 shadow-[inset_0_4px_20px_rgba(249,115,22,0.2),inset_0_2px_10px_rgba(236,72,153,0.1)] p-4 flex flex-col justify-between z-10">
					<div className="flex items-start justify-between mb-3">
						<h3 className="font-jersey15 text-xl md:text-2xl bg-linear-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent leading-tight flex-1 pr-5 drop-shadow-[3px_3px_0px_rgba(168,85,247,0.8)] tracking-tight uppercase">
							{event_name}
						</h3>
						<div className="text-right shrink-0">
							<div className="font-vcr text-base text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
								{event_price > 0 ? formatCurrency(event_price) : "FREE"}
							</div>
							{event_price > 0 && (
								<div className="text-xs text-gray-400 font-vcr">+ GST</div>
							)}
						</div>
					</div>

					<div className="flex items-center gap-4 mb-3 text-sm text-white/90 font-vcr">
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4 text-pink-400" />
							<span>{formatDateOnly(event_date)}</span>
						</div>
						{is_group && (
							<div className="flex items-center gap-1">
								<Users className="w-4 h-4 text-orange-400" />
								<span className="text-white/90">TEAM</span>
							</div>
						)}
					</div>

					{tags && tags.length > 0 && (
						<div className="flex items-center gap-2 overflow-hidden">
							{tags.slice(0, 2).map((tag) => (
								<span
									key={`${event_id}-${tag}`}
									className="text-xs px-2 py-1 bg-orange-500/15 backdrop-blur-sm border border-orange-400/50 text-orange-300 whitespace-nowrap font-vcr uppercase shadow-[0_0_8px_rgba(251,146,60,0.3)]"
								>
									{getTagLabel(tag)}
								</span>
							))}
							{tags.length > 2 && (
								<span className="text-xs px-2 py-1 bg-black/80 backdrop-blur-sm border border-pink-500/60 text-pink-300 font-vcr shadow-[0_0_6px_rgba(236,72,153,0.3)]">
									+{tags.length - 2}
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default EventCard;
