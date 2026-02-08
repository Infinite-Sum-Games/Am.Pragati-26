import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { FilterDropdown } from "@/components/events/FilterDropdown";
import { FilterRadioPair } from "@/components/events/FilterRadioPair";
import Navbar from "@/components/Navbar";
import { useAllEvents } from "@/hooks/useAllEvents";
import { useStarEvent } from "@/hooks/useStarEvent";
import { useAuthStore } from "@/store/auth.store";

const BACKGROUND_IMAGE_URL =
	"https://speugdv1vi.ufs.sh/f/y8q1VPJuKeA1TTlZtKwkMt4sZaGR2pLP37qUHNQlgKObDVmf";

export const Route = createFileRoute("/events/")({
	component: EventsPage,
});

function EventsPage() {
	const { data: events, isLoading, error } = useAllEvents();
	const starMutation = useStarEvent();
	const navigate = useNavigate();
	const { user } = useAuthStore();

	/* SEARCH */
	const [search, setSearch] = useState("");

	/* FILTER VISIBILITY */
	const [showFilters, setShowFilters] = useState(false);

	/* DROPDOWNS */
	const [daysOpen, setDaysOpen] = useState(false);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	/* MUTUAL GROUPS */
	const [teamType, setTeamType] = useState<"individual" | "group" | null>(null);
	const [managementType, setManagementType] = useState<
		"management" | "non-management" | null
	>(null);
	const [regType, setRegType] = useState<
		"registered" | "not-registered" | null
	>(null);

	const handleStarToggle = (eventId: string) => {
		if (!user) {
			navigate({ to: "/login" });
			return;
		}
		const event = events?.find((e) => e.event_id === eventId);
		if (event) {
			starMutation.mutate(event);
		}
	};

	const handleCardClick = (eventId: string) => {
		navigate({
			to: "/events/$eventId",
			params: { eventId },
		});
	};

	/* CLEAR ALL */
	const clearAll = () => {
		setSearch("");
		setSelectedDays([]);
		setTeamType(null);
		setManagementType(null);
		setRegType(null);
	};

	/* SEARCH FILTER */
	const filteredEvents = useMemo(() => {
		let result = [...(events || [])];

		// Search filter
		if (search.trim()) {
			const q = search.toLowerCase();
			result = result.filter(
				(e) =>
					e.event_name.toLowerCase().includes(q) ||
					e.tags?.some((t) => t.toLowerCase().includes(q)),
			);
		}

		// Days filter - filter by event date
		if (selectedDays.length > 0) {
			result = result.filter((e) => {
				const eventDate = new Date(e.event_date);
				const day = eventDate.getDate();
				// Map Day 1/2 to actual dates (20th, 21th)
				const dayMap: Record<string, number> = {
					"20TH FEB": 20,
					"21ST FEB": 21,
				};
				return selectedDays.some((d) => dayMap[d] === day);
			});
		}

		// Team Type filter
		if (teamType) {
			if (teamType === "group") {
				result = result.filter((e) => e.is_group);
			} else {
				result = result.filter((e) => !e.is_group);
			}
		}

		// Management filter (is_management field)
		if (managementType) {
			if (managementType === "management") {
				result = result.filter((e) => e.is_management);
			} else {
				result = result.filter((e) => !e.is_management);
			}
		}

		// Registration filter
		if (regType) {
			if (regType === "registered") {
				result = result.filter((e) => e.is_registered);
			} else {
				result = result.filter((e) => !e.is_registered);
			}
		}

		result.sort((a, b) => {
			if (a.isStarred === b.isStarred) return 0;
			return a.isStarred ? -1 : 1;
		});

		return result;
	}, [search, events, selectedDays, teamType, managementType, regType]);

	if (isLoading) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen w-full bg-black relative overflow-hidden pt-20">
					<div
						className="absolute inset-0 opacity-[0.04] pointer-events-none"
						style={{
							backgroundImage:
								"linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)",
							backgroundSize: "50px 50px",
						}}
					/>
					<div className="relative z-10 p-4 md:p-8">
						<div className="text-center mb-12 md:mb-16">
							<h1 className="font-jersey15 text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-[3px_3px_0px_rgba(168,85,247,0.8)] md:drop-shadow-[4px_4px_0px_rgba(168,85,247,0.8)] tracking-tight uppercase leading-none">
								ALL EVENTS
							</h1>
						</div>
						<div className="max-w-7xl mx-auto mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-5">
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
							<div className="w-full aspect-3/5 bg-gray-900/50 animate-pulse" />
						</div>
					</div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen w-full bg-black relative overflow-hidden pt-20">
					<div className="relative z-10 p-4 md:p-8 flex items-center justify-center">
						<p className="text-red-500 font-vcr text-2xl">
							Error loading events: {error.message}
						</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<div
				className="min-h-screen w-full relative overflow-hidden pt-20"
				style={{
					backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
				}}
			>
				<div className="absolute inset-0 bg-black/70 pointer-events-none" />
				<div className="relative z-10 p-4 md:p-8">
					{/* HEADER */}
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12 md:mb-16"
					>
						{/* Title with decorative elements */}
						<div className="relative inline-block mb-6">
							{/* Decorative squares */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 border-2 border-retro-cyan/60 animate-pulse"
							/>
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 border-2 border-[#a855f7]/60 animate-pulse"
							/>

							<h1 className="font-jersey15 text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-[3px_3px_0px_rgba(168,85,247,0.8)] md:drop-shadow-[4px_4px_0px_rgba(168,85,247,0.8)] tracking-tight uppercase leading-none">
								ALL EVENTS
							</h1>
						</div>

						{/* Event Count with better styling */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="mb-8"
						>
							<div className="inline-block bg-black/40 backdrop-blur-md border border-retro-cyan/30 px-6 py-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
								<p className="font-vcr text-retro-cyan text-sm tracking-[0.2em] uppercase">
									SHOWING{" "}
									<span className="text-white font-bold text-base">
										{filteredEvents.length}
									</span>{" "}
									OF{" "}
									<span className="text-white font-bold text-base">
										{events?.length || 0}
									</span>{" "}
									EVENTS
								</p>
							</div>
						</motion.div>

						{/* Search and Sort Controls */}
						<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search events..."
								className="flex-1 px-4 py-2.5 bg-black/40 backdrop-blur-sm border border-retro-cyan/30 text-white font-vcr text-sm tracking-[0.1em] placeholder:text-white/30 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all"
							/>

							<FilterDropdown
								label="📅 EVENT DAYS"
								open={daysOpen}
								setOpen={setDaysOpen}
								items={["20TH FEB", "21ST FEB"]}
								selected={selectedDays}
								setSelected={setSelectedDays}
							/>

							<button
								type="button"
								onClick={() => setShowFilters((v) => !v)}
								className={`relative px-6 py-2.5 font-bold font-vcr text-sm tracking-widest uppercase transition-all duration-200 border-2 ${
									showFilters
										? "bg-[#7c3aed] border-black text-white shadow-[4px_4px_0_rgba(0,0,0,1)]"
										: "bg-black/40 backdrop-blur-sm border-retro-cyan/30 text-retro-cyan hover:border-[#a855f7] hover:text-[#a855f7]"
								}`}
							>
								{showFilters ? "Hide Filters" : "Show Filters"}
							</button>
						</div>

						{/* FILTERS */}
						{showFilters && (
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className="relative mt-6 max-w-6xl mx-auto bg-black/60 backdrop-blur-sm border border-retro-cyan/30 p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
							>
								<div className="flex flex-wrap gap-4 md:gap-6 items-end">
									<div className="flex flex-col items-start">
										<div className="flex items-center gap-2 mb-1">
											<div className="h-0.5 w-4 bg-[#a855f7]" />
											<span className="font-vcr text-[9px] text-[#a855f7] tracking-widest uppercase">
												TEAM
											</span>
										</div>
										<FilterRadioPair
											a="INDIVIDUAL"
											b="GROUP"
											value={teamType}
											setValue={(v) =>
												setTeamType(v as "individual" | "group" | null)
											}
										/>
									</div>
									<div className="flex flex-col items-start">
										<div className="flex items-center gap-2 mb-1">
											<div className="h-0.5 w-4 bg-[#a855f7]" />
											<span className="font-vcr text-[9px] text-[#a855f7] tracking-widest uppercase">
												TRACK
											</span>
										</div>
										<FilterRadioPair
											a="MANAGEMENT"
											b="NON-MANAGEMENT"
											value={managementType}
											setValue={(v) =>
												setManagementType(
													v as "management" | "non-management" | null,
												)
											}
										/>
									</div>
									<div className="flex flex-col items-start">
										<div className="flex items-center gap-2 mb-1">
											<div className="h-0.5 w-4 bg-[#a855f7]" />
											<span className="font-vcr text-[9px] text-[#a855f7] tracking-widest uppercase">
												STATUS
											</span>
										</div>
										<FilterRadioPair
											a="REGISTERED"
											b="NOT REGISTERED"
											value={regType}
											setValue={(v) =>
												setRegType(v as "registered" | "not-registered" | null)
											}
										/>
									</div>
									<button
										type="button"
										onClick={clearAll}
										className="px-6 py-2.5 font-bold font-vcr text-sm tracking-widest uppercase transition-all duration-200 border-2 bg-black/40 backdrop-blur-sm border-retro-cyan/30 text-retro-cyan hover:border-[#a855f7] hover:text-[#a855f7]"
									>
										✖ CLEAR ALL
									</button>
								</div>
							</motion.div>
						)}
					</motion.div>

					{/* EVENT GRID */}
					<div className="max-w-7xl mx-auto mb-16">
						{filteredEvents.length === 0 ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-retro-cyan/30 rounded-sm bg-black/90"
							>
								<div className="inline-block mb-6">
									<div className="text-8xl mb-4">🎮</div>
									<div className="flex items-center justify-center gap-2">
										<div className="w-2 h-2 bg-retro-cyan" />
										<h3
											className="font-jersey15 text-4xl text-retro-yellow uppercase"
											style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
										>
											NO EVENTS FOUND
										</h3>
										<div className="w-2 h-2 bg-retro-yellow" />
									</div>
								</div>
								<p className="font-vcr text-gray-400 text-lg mb-8">
									{search ||
									selectedDays.length > 0 ||
									teamType ||
									managementType ||
									regType
										? "Try adjusting your filters or search terms"
										: "No events available at the moment"}
								</p>
								{(search ||
									selectedDays.length > 0 ||
									teamType ||
									managementType ||
									regType) && (
									<button
										type="button"
										onClick={clearAll}
										className="relative px-8 py-3 rounded-sm font-bold text-sm tracking-widest uppercase transition-all duration-300 border-2 backdrop-blur-sm group bg-black/40 border-retro-cyan/50 text-retro-cyan hover:border-retro-pink hover:text-retro-pink"
									>
										<div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-retro-cyan group-hover:bg-retro-pink" />
										<div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-retro-cyan group-hover:bg-retro-pink" />
										↻ RESET FILTERS
									</button>
								)}
							</motion.div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5">
								{filteredEvents.map((event) => (
									<EventCard
										key={event.event_id}
										event={event}
										onStarToggle={() => handleStarToggle(event.event_id)}
										isStarLoading={
											starMutation.isPending &&
											starMutation.variables?.event_id === event.event_id
										}
										onCardClick={() => handleCardClick(event.event_id)}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
