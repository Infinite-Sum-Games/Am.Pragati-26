import type { UseFormRegister, UseFormReset } from "react-hook-form";
import { z } from "zod";

export interface Profile {
	name: string;
	email: string;
	phone_number: string;
	college_name: string;
	college_city: string;
	is_amrita_student: boolean;
	amrita_roll_number?: string;
	is_registered: boolean;
}

export type PROFILE_CARD_PROPS = {
	avatarEmail: string;
	email: string;
	name: string;
	phone_number: string;
	college_name: string;
	college_city: string;
	is_amrita_coimbatore: boolean;
	has_offline_event: boolean;
	register: UseFormRegister<Record<EditableFields, string>>;
	reset: UseFormReset<Record<EditableFields, string>>;
	errors: {
		name?: string;
		phone_number?: string;
		college_name?: string;
		college_city?: string;
	};
	onSubmit: () => void;
	isDirty: boolean;
};

export type UpdateProfilePayload = Omit<
	Profile,
	"email" | "amrita_roll_number" | "is_amrita_student" | "is_registered"
>;

export type EditableFields =
	| "name"
	| "phone_number"
	| "college_name"
	| "college_city";

export const profileFormSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least two characters")
		.max(747, "Name cannot be longer than 747 characters"),
	phone_number: z.string().regex(/^[6-9]\d{9}$/, {
		message: "Please enter a valid 10 digit phone number",
	}),
	college_name: z
		.string()
		.min(1, "College Name is required")
		.regex(/^[a-zA-Z\s]+$/, "Only alphabets")
		.max(600, "College Name cannot exceed 600 characters"),
	college_city: z
		.string()
		.min(1, "City is required")
		.regex(/^[a-zA-Z\s]+$/, "Only alphabets")
		.max(200, "City Name cannot be longer than 200 characters"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
