export interface BookingResponse {
	message: string;
	booking_id?: string;
	// Payment data returned from book endpoint
	hash?: string;
	name?: string;
	phone?: string;
	productInfo?: string;
	registrationFee?: string;
	txnId?: string;
	userEmail?: string;
}

export interface TeamMember {
	student_email: string;
	student_role?: string;
}

export interface GroupBookingPayload {
	team_name: string;
	team_members: TeamMember[];
	ps?: string;
}

// biome-ignore lint/complexity/noBannedTypes: allowed {}
export type IndividualBookingPayload = {};
