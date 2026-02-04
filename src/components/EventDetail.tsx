import { useRouter } from "@tanstack/react-router";
import {
	Building2,
	Calendar,
	Check,
	ChevronDown,
	Clock,
	MapPin,
	Star,
	Users,
	X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type {
	EventDetailProps,
	EventOrganisersProps,
} from "@/types/eventDetailTypes";
import type { EventDetails, Organizer } from "@/types/eventTypes";

interface MarkdownRendererProps {
	content: string;
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<div className="prose prose-sm max-w-none">
			<ReactMarkdown
				components={{
					h1: ({ children }) => (
						<h1 className="text-2xl font-joystix uppercase tracking-wider mb-4 neon-cyan">
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-xl font-joystix uppercase tracking-wide mb-3 neon-yellow">
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-lg font-joystix uppercase tracking-wide mb-2 text-[#ff00ff]">
							{children}
						</h3>
					),
					p: ({ children }) => (
						<p className="mb-3 leading-relaxed text-gray-300 font-joystix text-sm">
							{children}
						</p>
					),
					ul: ({ children }) => (
						<ul className="list-none mb-3 space-y-1 font-joystix text-sm text-gray-300">
							{children}
						</ul>
					),
					ol: ({ children }) => (
						<ol className="list-none mb-3 space-y-1 font-joystix text-sm text-gray-300">
							{children}
						</ol>
					),
					li: ({ children }) => (
						<li className="flex items-start gap-2">
							<span className="text-[#00ffff] mt-1">▸</span>
							<span>{children}</span>
						</li>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

interface PriceSectionProps {
	event: EventDetails;
	isFull: boolean;
	isFree: boolean;
	isLoggedIn: boolean;
	isRegisterLoading: boolean;
	onRegister?: () => void;
	onNavigateToLogin: () => void;
	className?: string;
	isMobile?: boolean;
}

function PriceSection({
	event,
	isFull,
	isFree,
	isLoggedIn,
	isRegisterLoading,
	onRegister,
	onNavigateToLogin,
	className = "",
	isMobile = false,
}: PriceSectionProps) {
	return (
		<div
			className={`bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_rgba(126, 34, 206, 1)] ${isMobile ? "p-4" : "p-6"} space-y-4 relative ${className}`}
		>
			{/* Corner decorations */}
			<div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />
			<div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />
			<div className="absolute -bottom-7 -left-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />
			<div className="absolute -bottom-7 -right-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />

			<div className="bg-linear-to-br from-purple-950/30 to-transparent">
				<div
					className={`${isMobile ? "pb-3" : "pb-4"} border-b-2 border-[#7e22ce]`}
				>
					<div className="flex items-baseline justify-between">
						<div>
							{isFree ? (
								<span className="text-4xl font-press-start neon-cyan drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
									FREE
								</span>
							) : (
								<>
									<span className="text-4xl font-press-start neon-yellow drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
										₹{event.price}
									</span>
									<span className="text-xs font-joystix text-[#00ffff] ml-2 block mt-1 tracking-wider">
										{event.is_per_head ? "/ PER HEAD" : "/ PER TEAM"}
									</span>
								</>
							)}
						</div>
					</div>
				</div>

				<div
					className={`flex items-center justify-between ${isMobile ? "py-2" : "py-3"} border-2 border-[#00ffff]/30 bg-gray-950/50 px-3`}
				>
					<div className="flex items-center gap-2 text-[#00ffff]">
						<Users className="w-5 h-5 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]" />
						<span className="font-joystix uppercase tracking-wide text-sm">
							Team Size
						</span>
					</div>
					<span
						className={`font-press-start text-[#00ffff] ${isMobile ? "text-xs" : "text-sm"}`}
					>
						{event.is_group
							? event.min_teamsize !== event.max_teamsize
								? `${event.min_teamsize}-${event.max_teamsize}`
								: event.min_teamsize
							: "1"}
					</span>
				</div>
			</div>

			<div className={`${isMobile ? "pt-1" : "pt-2"}`}>
				{event.is_registered ? (
					<button
						type="button"
						disabled
						className="w-full py-3 bg-green-500/20 border-4 border-green-500 text-green-500 font-joystix uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-[3px_3px_0_rgba(34,197,94,1)] relative"
					>
						<Check className="w-5 h-5" />
						Registered
					</button>
				) : event.event_status === "COMPLETED" ? (
					<button
						type="button"
						disabled
						className="w-full py-3 bg-gray-800 border-4 border-gray-600 text-gray-500 font-joystix uppercase tracking-widest text-sm shadow-[3px_3px_0_rgba(75,85,99,1)]"
					>
						Event Completed
					</button>
				) : isFull || event.event_status === "CLOSED" ? (
					<button
						type="button"
						disabled
						className="w-full py-3 bg-red-500/20 border-4 border-red-500 text-red-500 font-joystix uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-[3px_3px_0_rgba(239,68,68,1)]"
					>
						<X className="w-5 h-5" />
						Registration Closed
					</button>
				) : isLoggedIn ? (
					<button
						type="button"
						onClick={onRegister}
						disabled={isRegisterLoading}
						className="w-full py-3 bg-[#00ffff] border-4 border-black text-black font-joystix uppercase tracking-widest text-sm font-bold hover:bg-[#00ffff]/90 hover:shadow-[5px_5px_0_rgba(0,0,0,1)] transition-all shadow-[3px_3px_0_rgba(0,0,0,1)] relative overflow-hidden group"
					>
						<span className="relative z-10">
							{isRegisterLoading ? "Processing..." : "Register Now"}
						</span>
						<div className="absolute inset-0 bg-[#7e22ce] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
					</button>
				) : (
					<button
						type="button"
						onClick={onNavigateToLogin}
						className="w-full py-3 bg-[#7c3aed] border-4 border-black text-white font-joystix uppercase tracking-widest text-sm font-bold hover:bg-[#6d28d9] hover:shadow-[5px_5px_0_rgba(0,0,0,1)] transition-all shadow-[3px_3px_0_rgba(0,0,0,1)]"
					>
						Login to Register
					</button>
				)}
			</div>
		</div>
	);
}

function EventOrganisers({ event, onOrganizerClick }: EventOrganisersProps) {
	if (!event.organizers || event.organizers.length === 0) {
		return null;
	}

	return (
		<div className="w-full bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_rgba(126,34,206,1)] relative">
			{/* Corner decorations */}
			<div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
			<div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
			<div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
			<div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.8)]" />

			<div className="bg-linear-to-br from-purple-950/50 to-black p-4">
				<h2 className="text-base text-[#00ffff] font-joystix uppercase tracking-widest neon-cyan mb-4 flex items-center gap-2">
					<Building2 className="w-5 h-5 text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
					ORGANIZED BY
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{event.organizers.map((org) => (
						<button
							key={org.organizer_name}
							type="button"
							onClick={() => onOrganizerClick?.(org)}
							className="relative bg-gray-950 border-2 border-[#ff00ff] shadow-[2px_2px_0_rgba(255,0,255,1)] hover:shadow-[3px_3px_0_rgba(255,0,255,1)] hover:border-[#00ffff] transition-all p-3 flex items-center gap-3 text-left w-full cursor-pointer"
						>
							{/* Corner dots */}
							<div className="absolute -top-1 -left-1 w-2 h-2 bg-[#00ffff]" />
							<div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ffff]" />
							<div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00ffff]" />
							<div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00ffff]" />

							{org.organizer_logo_url &&
							org.organizer_logo_url.trim() !== "" ? (
								<div className="relative w-12 h-12 shrink-0">
									<div className="w-full h-full border-2 border-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.6)]">
										<img
											src={org.organizer_logo_url}
											alt={org.organizer_name}
											className="w-full h-full object-contain"
										/>
									</div>
								</div>
							) : (
								<div className="w-12 h-12 shrink-0 bg-linear-to-br from-[#7e22ce] to-[#3d1a5f] border-2 border-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.6)] flex items-center justify-center">
									<span className="font-press-start text-xs text-[#00ffff]">
										{org.org_abbreviation.slice(0, 2)}
									</span>
								</div>
							)}

							<div className="flex-1 min-w-0">
								<span className="text-sm font-joystix uppercase tracking-wide text-white block truncate">
									{org.organizer_name}
								</span>
								<div className="flex items-center gap-2 mt-1">
									{org.org_abbreviation && (
										<span className="text-xs font-press-start text-[#00ffff]">
											{org.org_abbreviation}
										</span>
									)}
									{org.org_type && (
										<span className="text-xs font-joystix text-gray-500 truncate">
											[{org.org_type}]
										</span>
									)}
								</div>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default function EventDetail({
	event,
	onStarToggle,
	isStarLoading = false,
	isRegisterLoading = false,
	isLoggedIn = false,
	onRegister,
}: EventDetailProps & {
	onRegister?: () => void;
	user?: { name: string; email: string };
}) {
	const router = useRouter();
	const [isMarkdownExpanded, setIsMarkdownExpanded] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(
		null,
	);
	const markdownRef = useRef<HTMLDivElement>(null);
	const priceSectionRef = useRef<HTMLDivElement>(null);
	const markdownModalTitleId = useId();
	const organizerModalTitleId = useId();

	const displayCoverImageUrl =
		event.cover_image_url && event.cover_image_url.trim() !== ""
			? event.cover_image_url
			: "/images/comingsoon.jpg";

	const sortedSchedules = event.schedules
		? [...event.schedules].sort(
				(a, b) =>
					new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
			)
		: [];

	const isFull = event.is_full;
	const isFree = event.price === 0;

	const combinedMarkdown = `${event.event_description}${
		event.rules ? `\n\n### Rules & Guidelines\n\n${event.rules}` : ""
	}`;

	useEffect(() => {
		const element = markdownRef.current;
		if (!element) return;

		const checkOverflow = () => {
			setIsOverflowing(element.scrollHeight > element.clientHeight + 2);
		};

		checkOverflow();
		const observer = new ResizeObserver(checkOverflow);
		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (isMarkdownExpanded || selectedOrganizer) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMarkdownExpanded, selectedOrganizer]);

	return (
		<div className="w-full max-w-7xl mx-auto mt-16">
			<div className="md:hidden space-y-4">
				<div className="relative w-full aspect-square border-4 border-[#00ffff] shadow-[6px_6px_0_rgba(0,255,255,0.5)] overflow-hidden">
					<img
						src={displayCoverImageUrl}
						alt={event.event_name}
						className="w-full h-full object-cover"
					/>
					{/* Corner decorations */}
					<div className="absolute top-0 left-0 w-3 h-3 bg-[#ff00ff]" />
					<div className="absolute top-0 right-0 w-3 h-3 bg-[#ff00ff]" />
					<div className="absolute bottom-0 left-0 w-3 h-3 bg-[#ff00ff]" />
					<div className="absolute bottom-0 right-0 w-3 h-3 bg-[#ff00ff]" />
					<button
						type="button"
						onClick={onStarToggle}
						disabled={isStarLoading}
						className="absolute top-4 right-4 p-2 bg-black/90 border-2 border-[#f4d03f] shadow-[2px_2px_0_rgba(244,208,63,1)] hover:shadow-[3px_3px_0_rgba(244,208,63,1)] transition-all"
					>
						<Star
							className={`w-5 h-5 ${event.isStarred ? "fill-[#f4d03f] text-[#f4d03f] drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]" : "text-[#f4d03f]"}`}
						/>
					</button>
				</div>

				<div>
					<h1 className="text-3xl font-jersey15 text-white mb-2 uppercase drop-shadow-[3px_3px_0_rgba(168,85,247,0.8)]">
						{event.event_name}
					</h1>
				</div>

				{event.tags && event.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{event.tags.map((tag) => (
							<span
								key={tag}
								className="px-3 py-1 bg-gray-950 border-2 border-[#00ffff] text-[#00ffff] text-xs font-joystix uppercase tracking-wider shadow-[2px_2px_0_rgba(0,255,255,1)] relative"
							>
								<div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
								<div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
								<div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
								<div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
								{tag}
							</span>
						))}
						{event.is_management && (
							<span
								className={`px-3 py-1 text-xs font-joystix uppercase tracking-wider relative shadow-[2px_2px_0_rgba(0,0,0,1)] bg-purple-950 border-2 border-[#7e22ce] text-[#7e22ce]`}
							>
								<div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
								<div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
								<div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
								<div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
								Management
							</span>
						)}
					</div>
				)}

				<div ref={priceSectionRef} className="sticky top-0 z-40 pt-2">
					<PriceSection
						event={event}
						isFull={isFull}
						isFree={isFree}
						isLoggedIn={isLoggedIn}
						isRegisterLoading={isRegisterLoading}
						onRegister={onRegister}
						onNavigateToLogin={() => router.navigate({ to: "/login" })}
						isMobile={true}
						className="shadow-lg"
					/>
				</div>

				<div className="space-y-3">
					{sortedSchedules.length > 0 && (
						<div className="bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_#7e22ce] p-4 relative">
							{/* Corner decorations */}
							<div className="absolute -top-2 -left-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -top-2 -right-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#00ffff]" />

							<h2 className="text-base font-joystix uppercase tracking-widest neon-cyan mb-3 flex items-center gap-2">
								<Calendar className="w-5 h-5 text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
								SCHEDULE
							</h2>
							<div className="space-y-3">
								{sortedSchedules.map((schedule) => (
									<div
										key={schedule.schedule_id}
										className="flex flex-col gap-1 bg-linear-to-br from-orange-950/30 to-transparent p-2 border-l-4 border-[#7e22ce]"
									>
										<div className="flex items-center gap-2 text-sm">
											<Calendar className="w-4 h-4 text-white" />
											<span className="text-white font-joystix tracking-wide">
												{new Date(schedule.event_date).toLocaleDateString(
													"en-US",
													{
														weekday: "long",
														year: "numeric",
														month: "long",
														day: "numeric",
													},
												)}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<Clock className="w-4 h-4 text-[#00ffff]" />
											<span className="text-[#00ffff] font-press-start text-xs">
												{new Date(schedule.start_time).toLocaleTimeString(
													"en-US",
													{ hour: "numeric", minute: "2-digit" },
												)}{" "}
												-{" "}
												{new Date(schedule.end_time).toLocaleTimeString(
													"en-US",
													{ hour: "numeric", minute: "2-digit" },
												)}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm">
											<MapPin className="w-4 h-4 text-white" />
											<span className="text-white font-joystix tracking-wide">
												{schedule.venue}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					<EventOrganisers
						event={event}
						onOrganizerClick={setSelectedOrganizer}
					/>
				</div>

				<div className="bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_rgba(126,34,206,1)] p-6 relative">
					{/* Corner decorations */}
					<div className="absolute -top-2 -left-2 w-3 h-3 bg-[#00ffff]" />
					<div className="absolute -top-2 -right-2 w-3 h-3 bg-[#00ffff]" />
					<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#00ffff]" />
					<div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#00ffff]" />

					<h2 className="text-xl font-joystix uppercase tracking-widest neon-yellow mb-4">
						About Event
					</h2>
					<MarkdownRenderer content={combinedMarkdown} />
				</div>
			</div>

			<div className="hidden md:grid md:grid-cols-12 md:gap-8">
				<div className="col-span-4 space-y-6">
					<div className="relative w-full aspect-square border-4 border-[#00ffff] shadow-[6px_6px_0_rgba(0,255,255,0.5)] overflow-hidden">
						<img
							src={displayCoverImageUrl}
							alt={event.event_name}
							className="w-full h-full object-cover"
						/>
						{/* Corner decorations */}
						<div className="absolute top-0 left-0 w-4 h-4 bg-[#7e22ce]" />
						<div className="absolute top-0 right-0 w-4 h-4 bg-[#7e22ce]" />
						<div className="absolute bottom-0 left-0 w-4 h-4 bg-[#7e22ce]" />
						<div className="absolute bottom-0 right-0 w-4 h-4 bg-[#7e22ce]" />
						<button
							type="button"
							onClick={onStarToggle}
							disabled={isStarLoading}
							className="absolute top-4 right-4 p-2 bg-black/90 border-2 border-[#f4d03f] shadow-[2px_2px_0_rgba(244,208,63,1)] hover:shadow-[3px_3px_0_rgba(244,208,63,1)] transition-all"
						>
							<Star
								className={`w-5 h-5 ${event.isStarred ? "fill-[#f4d03f] text-[#f4d03f] drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]" : "text-[#f4d03f]"}`}
							/>
						</button>
					</div>
					<PriceSection
						event={event}
						isFull={isFull}
						isFree={isFree}
						isLoggedIn={isLoggedIn}
						isRegisterLoading={isRegisterLoading}
						onRegister={onRegister}
						onNavigateToLogin={() => router.navigate({ to: "/login" })}
					/>
				</div>

				<div className="col-span-8 space-y-6 flex flex-col">
					<div>
						<h1 className="text-5xl font-jersey15 text-white mb-3 uppercase drop-shadow-[4px_4px_0_rgba(168,85,247,0.8)]">
							{event.event_name}
						</h1>
						{event.tags && event.tags.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{event.tags.map((tag) => (
									<span
										key={tag}
										className="px-3 py-1.5 bg-gray-950 border-2 border-[#00ffff] text-[#00ffff] text-sm font-joystix uppercase tracking-wider shadow-[2px_2px_0_rgba(0,255,255,1)] relative"
									>
										<div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
										<div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
										<div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
										<div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#7e22ce]" />
										{tag}
									</span>
								))}
								{event.is_management && (
									<span
										className={`px-3 py-1.5 text-sm font-joystix uppercase tracking-wider relative shadow-[2px_2px_0_rgba(0,0,0,1)] bg-blue-950 border-2 border-[#7e22ce] text-white`}
									>
										<div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
										<div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
										<div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
										<div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00ffff]" />
										Management
									</span>
								)}
							</div>
						)}
					</div>

					<div className="flex w-full gap-4 flex-col md:flex-row">
						{sortedSchedules.length > 0 && (
							<div className="bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_#7e22ce] p-6 w-full relative">
								{/* Corner decorations */}
								<div className="absolute -top-2 -left-2 w-3 h-3 bg-[#00ffff]" />
								<div className="absolute -top-2 -right-2 w-3 h-3 bg-[#00ffff]" />
								<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#00ffff]" />
								<div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#00ffff]" />

								<h2 className="text-base text-[#00ffff] font-joystix uppercase tracking-widest neon-cyan mb-4 flex items-center gap-2">
									<Calendar className="w-5 h-5 text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
									SCHEDULE
								</h2>
								<div className="space-y-4">
									{sortedSchedules.map((schedule) => (
										<div
											key={schedule.schedule_id}
											className="space-y-2 bg-linear-to-br from-orange-950/30 to-transparent p-3 border-l-4 border-[#7e22ce]"
										>
											<div className="flex items-center gap-2 text-sm">
												<Calendar className="w-4 h-4 text-white" />
												<span className="text-white font-joystix tracking-wide">
													{new Date(schedule.event_date).toLocaleDateString(
														"en-US",
														{
															weekday: "short",
															month: "short",
															day: "numeric",
															year: "numeric",
														},
													)}
												</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<Clock className="w-4 h-4 text-[#00ffff]" />
												<span className="text-[#00ffff] font-press-start text-xs">
													{new Date(schedule.start_time).toLocaleTimeString(
														"en-US",
														{ hour: "numeric", minute: "2-digit" },
													)}{" "}
													-{" "}
													{new Date(schedule.end_time).toLocaleTimeString(
														"en-US",
														{ hour: "numeric", minute: "2-digit" },
													)}
												</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<MapPin className="w-4 h-4 text-white" />
												<span className="text-white font-joystix tracking-wide">
													{schedule.venue}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
						<div className="w-full">
							<EventOrganisers
								event={event}
								onOrganizerClick={setSelectedOrganizer}
							/>
						</div>
					</div>

					<div className="bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_rgba(126,34,206,1)] p-6 relative">
						{/* Corner decorations */}
						<div className="absolute -top-2 -left-2 w-3 h-3 bg-[#00ffff]" />
						<div className="absolute -top-2 -right-2 w-3 h-3 bg-[#00ffff]" />
						<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#00ffff]" />
						<div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#00ffff]" />

						<h2 className="text-xl font-joystix uppercase tracking-widest neon-yellow mb-4">
							About Event
						</h2>
						<div
							ref={markdownRef}
							className={`${!isMarkdownExpanded ? "max-h-96 overflow-hidden" : ""}`}
						>
							<MarkdownRenderer content={combinedMarkdown} />
						</div>
						{isOverflowing && !isMarkdownExpanded && (
							<button
								type="button"
								onClick={() => setIsMarkdownExpanded(true)}
								className="mt-4 text-[#00ffff]/80 hover:text-[#00ffff] flex items-center gap-1 text-sm font-joystix uppercase tracking-wider transition-colors"
							>
								Read More
								<ChevronDown className="w-4 h-4" />
							</button>
						)}
					</div>
				</div>
			</div>

			{isMarkdownExpanded && (
				<button
					type="button"
					className="fixed text-left inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center"
					onClick={() => setIsMarkdownExpanded(false)}
					onKeyDown={(e) => {
						if (e.key === "Escape" || e.key === "Enter") {
							setIsMarkdownExpanded(false);
						}
					}}
					aria-label="Close modal"
				>
					<div
						className="relative w-full max-w-5xl bg-black border-4 border-[#7e22ce] shadow-[8px_8px_0_rgba(126,34,206,0.8)] px-16 py-8 space-y-6 max-h-[90vh] overflow-y-auto hide-scrollbar"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby={markdownModalTitleId}
					>
						<div className="flex items-center justify-between">
							<h2
								id={markdownModalTitleId}
								className="text-2xl font-joystix uppercase tracking-widest neon-yellow"
							>
								About Event
							</h2>
							<button
								type="button"
								onClick={() => setIsMarkdownExpanded(false)}
								className="p-2 bg-gray-950 border-2 border-[#00ffff] shadow-[2px_2px_0_rgba(0, 255,255,1)] hover:shadow-[3px_3px_0_rgba(0,255,255,1)] transition-all"
							>
								<X className="w-6 h-6 text-[#00ffff]" />
							</button>
						</div>

						<div className="border-b-2 border-[#7e22ce] w-full my-1" />
						<MarkdownRenderer content={combinedMarkdown} />
					</div>
				</button>
			)}

			{selectedOrganizer && (
				<button
					type="button"
					className="fixed text-left inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center"
					onClick={() => setSelectedOrganizer(null)}
					onKeyDown={(e) => {
						if (e.key === "Escape" || e.key === "Enter") {
							setSelectedOrganizer(null);
						}
					}}
					aria-label="Close modal"
				>
					<div
						className="relative w-full max-w-2xl bg-black border-4 border-[#7e22ce] shadow-[8px_8px_0_rgba(126,34,206,0.8)] px-8 py-8 space-y-6 max-h-[90vh] overflow-y-auto hide-scrollbar"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby={organizerModalTitleId}
					>
						<div className="flex items-center justify-between">
							<h2
								id={organizerModalTitleId}
								className="text-2xl text-[#00ffff] font-joystix uppercase tracking-widest neon-cyan"
							>
								Organizer Details
							</h2>
							<button
								type="button"
								onClick={() => setSelectedOrganizer(null)}
								className="p-2 bg-gray-950 border-2 border-[#ff00ff] shadow-[2px_2px_0_rgba(255,0,255,1)] hover:shadow-[3px_3px_0_rgba(255,0,255,1)] transition-all"
							>
								<X className="w-6 h-6 text-[#ff00ff]" />
							</button>
						</div>

						<div className="border-b-2 border-[#ff00ff] w-full" />

						<div className="flex items-start gap-6">
							{selectedOrganizer.organizer_logo_url &&
							selectedOrganizer.organizer_logo_url.trim() !== "" ? (
								<div className="relative w-32 h-32 shrink-0">
									<div className="w-full h-full border-4 border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)]">
										<img
											src={selectedOrganizer.organizer_logo_url}
											alt={selectedOrganizer.organizer_name}
											className="w-full h-full object-contain"
										/>
									</div>
								</div>
							) : (
								<div className="w-32 h-32 shrink-0 bg-linear-to-br from-[#7e22ce] to-[#3d1a5f] border-4 border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.8)] flex items-center justify-center">
									<span className="font-press-start text-3xl text-[#00ffff]">
										{selectedOrganizer.org_abbreviation.slice(0, 2)}
									</span>
								</div>
							)}

							<div className="flex-1 space-y-4">
								<div>
									<h3 className="text-xs font-joystix uppercase tracking-widest text-gray-500 mb-1">
										Organization Name
									</h3>
									<p className="text-xl font-joystix uppercase tracking-wide text-white">
										{selectedOrganizer.organizer_name}
									</p>
								</div>

								{selectedOrganizer.org_abbreviation && (
									<div>
										<h3 className="text-xs font-joystix uppercase tracking-widest text-gray-500 mb-1">
											Abbreviation
										</h3>
										<p className="text-lg font-press-start text-[#00ffff]">
											{selectedOrganizer.org_abbreviation}
										</p>
									</div>
								)}

								{selectedOrganizer.org_type && (
									<div>
										<h3 className="text-xs font-joystix uppercase tracking-widest text-gray-500 mb-1">
											Type
										</h3>
										<p className="text-lg font-joystix uppercase text-[#ff00ff]">
											{selectedOrganizer.org_type}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</button>
			)}
		</div>
	);
}
