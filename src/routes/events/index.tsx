import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import type { Event } from "@/types/eventTypes";
import { EventCard } from "@/components/events/EventCard";
import { FilterDropdown } from "@/components/events/FilterDropdown";
import { FilterRadioPair } from "@/components/events/FilterRadioPair";

/* ---------------- SAMPLE EVENT DATA ---------------- */
const sampleEvents: Event[] = [
	{
		event_id: "1",
		event_name: "Code Wars 2026",
		event_image_url:
			"https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
		event_description:
			"Battle it out in this intense coding competition. Solve complex algorithms and win prizes!",
		event_date: "2026-02-15",
		event_status: "open",
		event_price: 500,
		is_group: true,
		is_management: true,
		event_type: "competition",
		tags: ["Coding", "Technical", "Team"],
		is_registered: false,
		isStarred: false,
		is_full: false,
		is_filling_fast: true,
	},
	{
		event_id: "2",
		event_name: "Retro Gaming Night",
		event_image_url:
			"https://images.unsplash.com/photo-1511512578047-dfb367046420",
		event_description:
			"Nostalgic gaming session with classic arcade games and retro consoles.",
		event_date: "2026-02-20",
		event_status: "open",
		event_price: 0,
		is_group: false,
		is_management: false,
		event_type: "entertainment",
		tags: ["Gaming", "Fun"],
		is_registered: true,
		isStarred: true,
		is_full: false,
		is_filling_fast: false,
	},
	{
		event_id: "3",
		event_name: "AI/ML Workshop",
		event_image_url:
			"https://images.unsplash.com/photo-1677442136019-21780ecad995",
		event_description:
			"Learn about cutting-edge AI and Machine Learning techniques from industry experts.",
		event_date: "2026-03-01",
		event_status: "completed",
		event_price: 1000,
		is_group: false,
		is_management: true,
		event_type: "workshop",
		tags: ["AI", "ML", "Workshop"],
		is_registered: false,
		isStarred: false,
		is_full: true,
		is_filling_fast: false,
	},
	{
		event_id: "4",
		event_name: "Cyberpunk Dance Battle",
		event_image_url:
			"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
		event_description:
			"Show off your moves in this neon-lit dance competition with amazing prizes!",
		event_date: "2026-02-25",
		event_status: "open",
		event_price: 300,
		is_group: true,
		is_management: false,
		event_type: "cultural",
		tags: ["Dance", "Cultural", "Performance"],
		is_registered: false,
		isStarred: true,
		is_full: false,
		is_filling_fast: true,
	},
	{
		event_id: "5",
		event_name: "Blockchain Hackathon",
		event_image_url: null,
		event_description:
			"Build innovative blockchain solutions in this 24-hour hackathon.",
		event_date: "2026-03-10",
		event_status: "open",
		event_price: 2500,
		is_group: true,
		is_management: true,
		event_type: "hackathon",
		tags: ["Blockchain", "Web3", "Coding", "Innovation"],
		is_registered: false,
		isStarred: false,
		is_full: false,
		is_filling_fast: false,
	},
	{
		event_id: "6",
		event_name: "Neon Poetry Slam",
		event_image_url:
			"https://images.unsplash.com/photo-1519389950473-47ba0277781c",
		event_description:
			"Express yourself through poetry in this electrifying performance event.",
		event_date: "2026-02-18",
		event_status: "open",
		event_price: 0,
		is_group: false,
		is_management: false,
		event_type: "cultural",
		tags: ["Poetry", "Cultural"],
		is_registered: true,
		isStarred: false,
		is_full: false,
		is_filling_fast: false,
	},
];

/* ---------------- COMPONENT ---------------- */
export const EventsPage = () => {
	/* LOCAL EVENTS STATE */
	const [events, setEvents] = useState<Event[]>(sampleEvents);

	/* SEARCH */
	const [search, setSearch] = useState("");

	/* FILTER VISIBILITY */
	const [showFilters, setShowFilters] = useState(false);

	/* DROPDOWNS */
	const [tagsOpen, setTagsOpen] = useState(false);
	const [daysOpen, setDaysOpen] = useState(false);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);

	/* MUTUAL GROUPS */
	const [eventType, setEventType] = useState<"workshop" | "event" | null>(null);
	const [teamType, setTeamType] = useState<"individual" | "group" | null>(null);
	const [managementType, setManagementType] = useState<
		"management" | "non-management" | null
	>(null);
	const [regType, setRegType] = useState<
		"registered" | "not-registered" | null
	>(null);

	/* STAR TOGGLE */
	const handleStarToggle = (eventId: string) => {
		setEvents((prev) =>
			prev.map((ev) =>
				ev.event_id === eventId ? { ...ev, isStarred: !ev.isStarred } : ev,
			),
		);
	};

	/* CLEAR ALL */
	const clearAll = () => {
		setSearch("");
		setSelectedTags([]);
		setSelectedDays([]);
		setEventType(null);
		setTeamType(null);
		setManagementType(null);
		setRegType(null);
	};

	/* SEARCH FILTER */
	const filteredEvents = useMemo(() => {
		let result = [...events];

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
				// Map Day 1/2/3 to actual dates (15th, 20th, 25th)
				const dayMap: Record<string, number> = {
					"Day 1": 15,
					"Day 2": 20,
					"Day 3": 25,
				};
				return selectedDays.some((d) => dayMap[d] === day);
			});
		}

		// Tags filter
		if (selectedTags.length > 0) {
			result = result.filter((e) =>
				e.tags?.some((t) => selectedTags.includes(t)),
			);
		}

		// Event Type filter (Workshop vs Event)
		if (eventType) {
			if (eventType === "workshop") {
				result = result.filter((e) => e.event_type === "workshop");
			} else {
				result = result.filter((e) => e.event_type !== "workshop");
			}
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

		return result;
	}, [search, events, selectedTags, selectedDays, eventType, teamType, managementType, regType]);

	return (
		<>
			<Navbar />
			<div className="min-h-screen w-full bg-black relative overflow-hidden pt-20">
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
						className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 border-2 border-retro-pink/60 animate-pulse"
					/>
					
					<h1 className="font-jersey15 text-5xl md:text-7xl lg:text-8xl text-retro-yellow drop-shadow-[3px_3px_0px_rgba(168,85,247,0.8)] md:drop-shadow-[4px_4px_0px_rgba(168,85,247,0.8)] tracking-tight uppercase leading-none">
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
					<div className="inline-block bg-black/60 backdrop-blur-sm border border-retro-cyan/30 rounded-lg px-6 py-2 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
						<p className="font-vcr text-retro-cyan text-sm tracking-wide">
							SHOWING <span className="text-retro-yellow font-bold text-base">{filteredEvents.length}</span> OF <span className="text-retro-yellow font-bold text-base">{events.length}</span> EVENTS
						</p>
					</div>
			</motion.div>

			{/* Search and Sort Controls */}
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4">
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search events..."
					className="flex-1 px-4 py-2 bg-black/70 border border-gray-600 rounded-md text-gray-200 font-vcr text-base"
				/>

				<select className="px-4 py-2 bg-black/70 border border-gray-600 rounded-md text-gray-200 font-vcr text-base">
					<option>Relevance</option>
					<option>Date (Earliest)</option>
					<option>Date (Latest)</option>
				</select>

				<button
					type="button"
					onClick={() => setShowFilters((v) => !v)}
					className="px-4 py-2 border border-retro-yellow/60 text-retro-yellow font-vcr text-base rounded-md"
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
					className="mt-6 max-w-6xl mx-auto bg-black/80 border-2 border-retro-cyan/60 rounded-lg p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.3)]"
				>
					{/* Filter Title */}
					<div className="flex items-center gap-3 mb-4">
						<div className="w-3 h-3 bg-retro-cyan animate-pulse" />
						<h3 className="font-jersey15 text-2xl text-retro-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
							FILTERS
						</h3>
						<div className="w-3 h-3 bg-retro-cyan animate-pulse" />
							</div>

							{/* Dropdowns */}
							<div className="flex flex-wrap gap-3 mb-4">
								<FilterDropdown
									label="📌 Tags"
									open={tagsOpen}
									setOpen={setTagsOpen}
									items={["Coding", "Gaming", "AI", "Cultural"]}
									selected={selectedTags}
									setSelected={setSelectedTags}
								/>

								<FilterDropdown
									label="📅 Event Days"
									open={daysOpen}
									setOpen={setDaysOpen}
									items={["Day 1", "Day 2", "Day 3"]}
									selected={selectedDays}
									setSelected={setSelectedDays}
								/>
							</div>

							{/* Radio Pairs */}
							<div className="flex flex-wrap gap-3 items-center">
								<FilterRadioPair
								a="Workshop"
								b="Event"
								value={eventType}
								setValue={setEventType}
							/>
							<FilterRadioPair
								a="Individual"
								b="Group"
								value={teamType}
								setValue={setTeamType}
							/>
							<FilterRadioPair
								a="Management"
								b="Non-Management"
								value={managementType}
								setValue={setManagementType}
							/>
							<FilterRadioPair
								a="Registered"
								b="Not Registered"
								value={regType}
								setValue={setRegType}
							/>

							<button
								type="button"
								onClick={clearAll}
								className="px-4 py-2 border-2 border-retro-pink/60 text-retro-pink font-vcr text-sm hover:bg-retro-pink/20 hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] transition-all duration-300"
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
					className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-retro-cyan/30 rounded-lg bg-black/40"
				>
							<div className="inline-block mb-6">
								<div className="text-8xl mb-4">🎮</div>
								<div className="flex items-center justify-center gap-2">
									<div className="w-2 h-2 bg-retro-yellow animate-pulse" />
									<h3 className="font-jersey15 text-4xl text-retro-yellow drop-shadow-[0_0_10px_rgba(244,208,62,0.8)]">
										NO EVENTS FOUND
									</h3>
									<div className="w-2 h-2 bg-retro-yellow animate-pulse" />
								</div>
							</div>
							<p className="font-vcr text-gray-400 text-lg mb-8">
								{search || selectedTags.length > 0 || selectedDays.length > 0 || eventType || teamType || managementType || regType
									? "Try adjusting your filters or search terms"
									: "No events available at the moment"}
							</p>
							{(search || selectedTags.length > 0 || selectedDays.length > 0 || eventType || teamType || managementType || regType) && (
								<button
									type="button"
									onClick={clearAll}
									className="px-6 py-3 border-2 border-retro-cyan text-retro-cyan font-vcr text-sm hover:bg-retro-cyan/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300"
								>
									↻ RESET FILTERS
								</button>
							)}
						</motion.div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredEvents.map((event) => (
								<EventCard
									key={event.event_id}
									event={event}
									onStarToggle={handleStarToggle}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
		</>
	);
};

export const Route = createFileRoute("/events/")({
	component: EventsPage,
});

