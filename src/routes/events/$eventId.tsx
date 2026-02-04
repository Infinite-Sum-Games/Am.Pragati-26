import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import EventDetail from "@/components/EventDetail";
import EventDetailSkeleton from "@/components/EventDetailSkeleton";
import CheckoutSummaryDialog from "@/components/events/CheckoutSummaryDialog";
import { GroupRegistrationForm } from "@/components/events/GroupRegistrationForm";
import Navbar from "@/components/Navbar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useBookGroupEvent, useBookIndividualEvent } from "@/hooks/useBooking";
import { useEventById } from "@/hooks/useEventById";
import { usePaymentFromBooking } from "@/hooks/usePaymentFromBooking";
import { useStarSingleEvent } from "@/hooks/useStarSingleEvent";
import { useAuthStore } from "@/store/auth.store";

import type { GroupBookingPayload } from "@/types/bookingTypes";

export const Route = createFileRoute("/events/$eventId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { eventId } = Route.useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { user, isHydrated } = useAuthStore();
	const isAuthenticated = !!user;

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
		if (!pendingBooking || !event) return;

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

	if (isLoading || !isHydrated) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-linear-to-b from-[#1a0a29] via-[#1a0b2e] to-black">
					<div className="container mx-auto px-4 py-8">
						<EventDetailSkeleton />
					</div>
				</div>
			</>
		);
	}

	if (error || !event) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-linear-to-b from-[#1a0a29] via-[#1a0b2e] to-black flex items-center justify-center">
					<p className="text-red-400">Failed to load event</p>
				</div>
			</>
		);
	}

	/* ---------------- render ---------------- */

	return (
		<>
			<Navbar />

			<div className="min-h-screen bg-linear-to-b from-black via-[#1a0b2e] to-black">
				<div className="container mx-auto px-4 py-8">
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
