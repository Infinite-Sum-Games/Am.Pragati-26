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
			className={`group relative w-full aspect-3/4 ${
				isEventClosed ? "cursor-not-allowed" : "cursor-pointer"
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleCardClick}
		>
			{/* Mobile status badge */}
			<div className="absolute top-3 left-3 z-30 md:hidden">
				{is_registered ? (
					<div className="px-3 py-1.5 bg-black/70 backdrop-blur-md border-2 border-green-500/60 text-green-400 flex items-center gap-1.5 text-xs font-vcr">
						<CheckCircle className="h-3 w-3" />
						REGISTERED
					</div>
				) : isEventClosed ? (
					<div className="px-3 py-1.5 bg-black/70 backdrop-blur-md border-2 border-gray-500/80 text-gray-400 flex items-center gap-1.5 text-xs font-vcr">
						<Lock className="w-3 h-3" />
						CLOSED
					</div>
				) : null}
			</div>

			{/* Card container - Glassmorphism style matching profile */}
			<div
				className={`
					relative w-full overflow-hidden flex flex-col
					bg-black/60 backdrop-blur-sm
					border transition-all duration-300 ease-out
					${isHovered ? "border-[#a855f7]" : "border-retro-cyan/30"}
					${isEventClosed ? "grayscale" : ""}
				`}
				style={{
					boxShadow: isHovered
						? "0 0 20px rgba(168,85,247,0.3)"
						: "0 0 15px rgba(0,0,0,0.5)",
				}}
			>
				{/* Image section */}
				<div className="w-full">
					<div className="relative w-full aspect-square overflow-hidden">
						<div
							className={`
								absolute inset-0 bg-cover bg-top origin-top transition-all duration-500 ease-out
								${isHovered ? "scale-105 brightness-110" : "scale-100"}
							`}
							style={{ backgroundImage: `url(${displayImageUrl})` }}
						/>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
						{/* Filling fast badge */}
						{is_filling_fast && !is_full && (
							<div className="absolute bottom-3 right-3 z-40">
								<div className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-retro-yellow border-2 border-black text-xs font-vcr text-black shadow-[2px_2px_0_rgba(0,0,0,1)]">
									<Zap className="w-3 h-3" />
									FILLING FAST
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Hover overlay */}
				<div
					className={`
						absolute top-0 left-0 right-0 h-[80%] 
						bg-black/80 backdrop-blur-md
						flex flex-col justify-center items-center p-6 border-b border-[#a855f7]/40
						transition-opacity duration-300 ease-out md:flex
						${isHovered ? "opacity-95" : "opacity-0 pointer-events-none"}
					`}
				>
					{is_registered ? (
						<div className="px-6 py-3 bg-green-600 border-2 border-black text-white flex items-center gap-2 text-sm font-vcr shadow-[4px_4px_0_rgba(0,0,0,1)]">
							<CheckCircle className="h-4 w-4" />
							REGISTERED
						</div>
					) : isEventClosed ? (
						<div className="px-6 py-3 bg-gray-600 border-2 border-black text-white flex items-center gap-2 text-sm font-vcr shadow-[4px_4px_0_rgba(0,0,0,1)]">
							<Lock className="w-4 h-4" />
							CLOSED
						</div>
					) : (
						<button
							type="button"
							className="px-6 py-3 font-vcr text-sm bg-[#7c3aed] border-2 border-black text-white 
								shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#6d28d9]
								hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)]
								active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,1)]
								transition-all duration-200 uppercase"
						>
							REGISTER NOW
						</button>
					)}
				</div>

				{/* Star button */}
				<button
					type="button"
					disabled={isEventClosed || isStarLoading}
					onClick={handleStarToggle}
					className={`absolute top-3 right-3 z-30 p-2 backdrop-blur-md
						border-2 transition-all duration-200 
						${isEventClosed ? "cursor-default opacity-50" : "hover:scale-105 cursor-pointer"}
						${
							isStarred
								? "bg-retro-yellow/20 border-retro-yellow"
								: "bg-black/70 border-white/30 hover:border-[#a855f7]"
						}
					`}
				>
					<Star
						className={`w-4 h-4 transition-all duration-200 ${
							isStarred
								? "text-retro-yellow fill-retro-yellow"
								: "text-white/70 hover:text-[#a855f7]"
						}`}
					/>
				</button>

				{/* Content section */}
				<div className="relative flex-1 shrink-0 w-full bg-black/60 border-t border-retro-cyan/30 p-4 flex flex-col justify-between z-10">
					<div className="flex items-start justify-between mb-3">
						<h3 className="font-jersey15 text-2xl md:text-3xl text-white leading-tight flex-1 pr-5 tracking-tight uppercase drop-shadow-[2px_2px_0px_#a855f7] line-clamp-2">
							{event_name}
						</h3>
						<div className="text-right shrink-0">
							<div className="font-vcr text-2xl text-retro-cyan">
								{event_price > 0 ? formatCurrency(event_price) : "FREE"}
							</div>
							{event_price > 0 && (
								<div className="text-sm text-white/50 font-vcr">+ GST</div>
							)}
						</div>
					</div>

					<div className="flex items-center gap-4 mb-3 text-lg text-white/80 font-vcr">
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4 text-retro-cyan" />
							<span>{formatDateOnly(event_date)}</span>
						</div>
						{is_group && (
							<div className="flex items-center gap-1">
								<Users className="w-4 h-4 text-[#a855f7]" />
								<span>TEAM</span>
							</div>
						)}
					</div>

					{tags && tags.length > 0 && (
						<div className="flex items-center gap-2">
							{tags.slice(0, 2).map((tag) => (
								<span
									key={`${event_id}-${tag}`}
									className="text-xs px-2 py-1 bg-[#a855f7]/20 border border-[#a855f7]/50 text-[#a855f7] whitespace-nowrap font-vcr uppercase"
								>
									{getTagLabel(tag)}
								</span>
							))}
							{tags.length > 2 && (
								<span className="text-xs px-2 py-1 bg-black/60 border border-white/20 text-white/60 font-vcr">
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
