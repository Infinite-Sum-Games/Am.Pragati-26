"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventService } from "@/services/EventService";
import type { Event } from "@/types/eventTypes";

export function useStarEvent() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (event: Event) => {
			if (event.isStarred) {
				await EventService.unstarEvent(event.event_id);
			} else {
				await EventService.starEvent(event.event_id);
			}
		},
		onMutate: async (event: Event) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ["events"] });

			// Snapshot the previous value
			const previousEvents = queryClient.getQueryData<Event[]>(["events"]);

			// Optimistically update to the new value
			queryClient.setQueryData<Event[]>(["events"], (old) =>
				old
					? old.map((e) =>
							e.event_id === event.event_id
								? { ...e, isStarred: !e.isStarred }
								: e,
						)
					: [],
			);

			// Return a context object with the snapshotted value
			return { previousEvents };
		},
		// If the mutation fails, use the context returned from onMutate to roll back
		onError: (_err, _variables, context) => {
			if (context?.previousEvents) {
				queryClient.setQueryData<Event[]>(["events"], context.previousEvents);
			}
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});
}
