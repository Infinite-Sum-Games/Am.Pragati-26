import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import EventDetail from "@/components/EventDetail";
import EventDetailSkeleton from "@/components/EventDetailSkeleton";
import CheckoutSummaryDialog from "@/components/events/CheckoutSummaryDialog"; //1 done!
import { GroupRegistrationForm } from "@/components/events/GroupRegistrationForm"; //2  done
import Navbar from "@/components/Navbar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useBookGroupEvent, useBookIndividualEvent } from "@/hooks/useBooking"; //3 done
import { useEventById } from "@/hooks/useEventById";
import { usePaymentFromBooking } from "@/hooks/usePaymentFromBooking"; //4
import { useStarSingleEvent } from "@/hooks/useStarSingleEvent";
import { useAuthStore } from "@/store/auth.store";

const BACKGROUND_IMAGE_URL =
	"https://speugdv1vi.ufs.sh/f/y8q1VPJuKeA1TTlZtKwkMt4sZaGR2pLP37qUHNQlgKObDVmf";

import type { GroupBookingPayload } from "@/types/bookingTypes"; //5

export const Route = createFileRoute("/events/$eventId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { eventId } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { user, isHydrated } = useAuthStore();
	const isAuthenticated = !!user;
	const [bgImageLoaded, setBgImageLoaded] = useState(false);

	// Preload background image
	useEffect(() => {
		const img = new Image();
		img.onload = () => setBgImageLoaded(true);
		img.onerror = () => setBgImageLoaded(false);
		img.src = BACKGROUND_IMAGE_URL;
	}, []);

	const { data: event, isLoading, error } = useEventById(eventId);
	const starMutation = useStarSingleEvent(eventId);

	const bookIndividualMutation = useBookIndividualEvent();
	const bookGroupMutation = useBookGroupEvent();
	const { redirectToPayment } = usePaymentFromBooking();

	/* ---------------- registration workflow state ---------------- */

	const [showGroupForm, setShowGroupForm] = useState(false);

	const [pendingBooking, setPendingBooking] = useState<{
		type: "individual" | "group";
		groupPayload?: GroupBookingPayload;
	} | null>(null);

	/* ---------------- handlers ---------------- */

	const handleStarToggle = () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		if (event) {
			starMutation.mutate(event.isStarred);
		}
	};

	const handleRegister = () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}

		if (!eventId || !event) return;

		// group event → open team form
		if (event.is_group) {
			setShowGroupForm(true);
			return;
		}

		// individual event → open checkout
		setPendingBooking({ type: "individual" });
	};

	const handleCheckoutSummaryConfirm = () => {
		if (
			!pendingBooking ||
			!event ||
			bookIndividualMutation.isPending ||
			bookGroupMutation.isPending
		) {
			return;
		}

		if (pendingBooking.type === "individual") {
			bookIndividualMutation.mutate(eventId, {
				onSuccess: (bookingData) => {
					setPendingBooking(null);

					queryClient.invalidateQueries({ queryKey: ["event", eventId] });
					queryClient.invalidateQueries({ queryKey: ["events"] });
					queryClient.invalidateQueries({ queryKey: ["registeredEvents"] });

					if (bookingData.hash && bookingData.txnId) {
						setTimeout(() => {
							redirectToPayment(bookingData);
						}, 1000);
					}
				},
				onError: () => {
					setPendingBooking(null);
				},
			});
		}

		if (pendingBooking.type === "group" && pendingBooking.groupPayload) {
			bookGroupMutation.mutate(
				{ eventId, payload: pendingBooking.groupPayload },
				{
					onSuccess: (bookingData) => {
						setPendingBooking(null);

						queryClient.invalidateQueries({ queryKey: ["event", eventId] });
						queryClient.invalidateQueries({ queryKey: ["events"] });
						queryClient.invalidateQueries({ queryKey: ["registeredEvents"] });

						if (bookingData.hash && bookingData.txnId) {
							setTimeout(() => {
								redirectToPayment(bookingData);
							}, 1000);
						}
					},
					onError: () => {
						setPendingBooking(null);
					},
				},
			);
		}
	};

	/* ---------------- loading & error ---------------- */
	const getBackgroundProps = () => {
		if (bgImageLoaded) {
			return {
				className: "min-h-screen w-full relative overflow-hidden pt-20",
				style: {
					backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
				},
			};
		}
		// Fallback to gradient background using Tailwind classes
		return {
			className:
				"min-h-screen bg-gradient-to-b from-[#1a0a29] via-[#1a0b2e] to-black",
			style: {},
		};
	};
	if (isLoading || !isHydrated) {
		const bgProps = getBackgroundProps();
		return (
			<>
				<Navbar />
				<div className={bgProps.className} style={bgProps.style}>
					{bgImageLoaded && (
						<div className="absolute inset-0 bg-black/70 pointer-events-none" />
					)}
					<div
						className={
							bgImageLoaded
								? "relative z-10 container mx-auto px-4 py-8"
								: "container mx-auto px-4 py-8"
						}
					>
						<EventDetailSkeleton />
					</div>
				</div>
			</>
		);
	}

	if (error) {
		const bgProps = getBackgroundProps();
		return (
			<>
				<Navbar />
				<div className={bgProps.className} style={bgProps.style}>
					{bgImageLoaded && (
						<div className="absolute inset-0 bg-black/70 pointer-events-none" />
					)}
					<div
						className={
							bgImageLoaded
								? "relative z-10 container mx-auto px-4 py-8 text-center"
								: "container mx-auto px-4 py-8 text-center"
						}
					>
						<h2 className="text-2xl text-red-500">Failed to load event</h2>
						<p className="text-red-400">{error.message}</p>
					</div>
				</div>
			</>
		);
	}

	if (!event) {
		const bgProps = getBackgroundProps();
		return (
			<>
				<Navbar />
				<div className={bgProps.className} style={bgProps.style}>
					{bgImageLoaded && (
						<div className="absolute inset-0 bg-black/70 pointer-events-none" />
					)}
					<div
						className={
							bgImageLoaded
								? "relative z-10 container mx-auto px-4 py-8 text-center"
								: "container mx-auto px-4 py-8 text-center"
						}
					>
						<h2 className="text-2xl text-yellow-500">Event not found</h2>
					</div>
				</div>
			</>
		);
	}

	const bgProps = getBackgroundProps();
	return (
		<>
			<Navbar />
			<div className={bgProps.className} style={bgProps.style}>
				{bgImageLoaded && (
					<div className="absolute inset-0 bg-black/70 pointer-events-none" />
				)}
				<div
					className={
						bgImageLoaded
							? "relative z-10 container mx-auto px-4 py-8"
							: "container mx-auto px-4 py-8"
					}
				>
					<EventDetail
						event={event}
						onStarToggle={handleStarToggle}
						onRegister={handleRegister}
						isLoggedIn={isAuthenticated}
						isStarLoading={starMutation.isPending}
						isRegisterLoading={
							bookIndividualMutation.isPending || bookGroupMutation.isPending
						}
					/>
				</div>
			</div>

			{/* ---------------- group registration dialog ---------------- */}

			<Dialog open={showGroupForm} onOpenChange={setShowGroupForm}>
				<DialogContent className="max-w-3xl">
					<DialogHeader>
						<DialogTitle>Team Registration</DialogTitle>
					</DialogHeader>
					<GroupRegistrationForm
						leaderName={user?.name || ""}
						leaderEmail={user?.email || ""}
						minTeamSize={event.min_teamsize ?? 2}
						maxTeamSize={event.max_teamsize ?? 10}
						onSubmit={(payload) => {
							setShowGroupForm(false);
							setPendingBooking({
								type: "group",
								groupPayload: payload,
							});
						}}
					/>
				</DialogContent>
			</Dialog>

			{/* ---------------- checkout summary ---------------- */}

			<CheckoutSummaryDialog
				open={!!pendingBooking}
				onOpenChange={(open) => {
					if (!open) setPendingBooking(null);
				}}
				eventName={event.event_name}
				unitPrice={event.price}
				quantity={
					pendingBooking?.type === "group" && pendingBooking.groupPayload
						? event.is_per_head
							? pendingBooking.groupPayload.team_members.length + 1
							: 1
						: 1
				}
				unit={
					event.is_group
						? event.is_per_head
							? "Member"
							: "Team"
						: "Individual"
				}
				onConfirm={handleCheckoutSummaryConfirm}
			/>
		</>
	);
}
