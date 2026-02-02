import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import EventDetail, { DUMMY_EVENT } from "@/components/EventDetail";
import EventDetailSkeleton from "@/components/EventDetailSkeleton";
import Navbar from "@/components/Navbar";
import type { EventDetails } from "@/types/eventTypes";

export const Route = createFileRoute("/events/$eventId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { eventId } = Route.useParams();
	const [loading, setLoading] = useState(true);

	console.log("Event ID:", eventId);

	const [event, setEvent] = useState<EventDetails>(DUMMY_EVENT);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	const handleStarToggle = () => {
		setEvent((prev) => ({ ...prev, isStarred: !prev.isStarred }));
	};

	const handleRegister = () => {
		setEvent((prev) => ({ ...prev, is_registered: true }));
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-linear-to-b from-[#1a0a29] via-[#1a0b2e] to-black">
				<div className="container mx-auto px-4 py-8">
					<EventDetailSkeleton />
				</div>
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-linear-to-b from-[#000000] via-[#1a0b2e] to-black cursor-none">
				<div className="container mx-auto px-4 py-8">
					<EventDetail
						event={event}
						onStarToggle={handleStarToggle}
						onRegister={handleRegister}
						isLoggedIn={true}
						isStarLoading={false}
						isRegisterLoading={false}
					/>
				</div>
			</div>
		</>
	);
}
