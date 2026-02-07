import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { randomise } from "@/lib/utils";
import type {
	BackendEvent,
	BackendEventDetails,
	Event,
	EventDetails,
	Organizer,
	Schedule,
} from "@/types/eventTypes";

// Helper function to decode base64 fields from backend
function decodeBase64Field<T>(encodedString: string | T[]): T[] {
	// If it's already an array, return it as-is (backwards compatibility)
	if (Array.isArray(encodedString)) {
		return encodedString;
	}

	// If it's a string, decode it
	if (typeof encodedString === "string" && encodedString.length > 0) {
		try {
			const decodedString = atob(encodedString);
			return JSON.parse(decodedString) as T[];
		} catch (error) {
			console.error("Failed to decode base64 field:", error);
			return [];
		}
	}

	return [];
}

export const EventService = {
	getAll: async (isAuthenticated: boolean = false): Promise<Event[]> => {
		const endpoint = isAuthenticated
			? API_ROUTES.EVENTS.GET_ALL_AUTH
			: API_ROUTES.EVENTS.GET_ALL;
		const res = await apiGet<{ events: BackendEvent[]; message: string }>(
			endpoint,
			{
				skipAuth: !isAuthenticated,
			},
		);

		const mappedEvents = res.events.map((event) => {
			// biome-ignore lint/correctness/noUnusedVariables: allowed
			const { is_starred, tags, organizers, ...rest } =
				event as BackendEvent & { organizers?: string[] };
			const filteredTags =
				tags?.filter((tag: string) => !tag.startsWith("!")) || [];

			return {
				...rest,
				tags: filteredTags,
				isStarred: is_starred,
			} as Event;
		});

		return randomise(mappedEvents);
	},

	getById: async (
		id: string,
		isAuthenticated: boolean = false,
	): Promise<EventDetails> => {
		const endpoint = isAuthenticated
			? API_ROUTES.EVENTS.GET_BY_ID_AUTH(id)
			: API_ROUTES.EVENTS.GET_BY_ID(id);
		const response = await apiGet<{
			event: BackendEventDetails;
			message: string;
		}>(endpoint, {
			skipAuth: !isAuthenticated,
		});

		// Handle response structure
		const rawEvent = response.event || response;

		// Decode base64 fields if they exist
		const eventDetails: EventDetails = {
			...rawEvent,
			organizers: rawEvent.organizers
				? decodeBase64Field<Organizer>(rawEvent.organizers)
				: [],
			schedules: rawEvent.schedules
				? decodeBase64Field<Schedule>(rawEvent.schedules)
				: [],
			tags: rawEvent.tags
				? decodeBase64Field<string>(rawEvent.tags).filter(
						(tag: string) => !tag.startsWith("!"),
					)
				: [],
			is_registered: rawEvent.is_registered ?? false,
			isStarred: rawEvent.is_starred || false,
			registrationId: rawEvent.registrationId || undefined,
		};

		return eventDetails;
	},

	starEvent: (eventId: string): Promise<{ message: string }> =>
		apiPut(API_ROUTES.EVENTS.FAVOURITE(eventId)),

	unstarEvent: (eventId: string): Promise<{ message: string }> =>
		apiDelete(API_ROUTES.EVENTS.FAVOURITE(eventId)),

	registerForEvent: (
		eventId: string,
	): Promise<{ checkout_url: string; message: string }> =>
		apiPost(API_ROUTES.EVENTS.BOOK(eventId)),
};
