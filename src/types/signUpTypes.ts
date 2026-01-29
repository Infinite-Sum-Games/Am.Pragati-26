import { z } from "zod";

export const SignUpSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z
			.string()
			.email("Invalid email address")
			.refine((e) => e === e.toLowerCase(), {
				message: "Email must be lowercase",
			}),
		phone_number: z
			.string()
			.regex(/^\d{10}$/, "Phone number must be 10 digits"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(8, "Please confirm your password"),
		college_name: z.string().min(1, "College name is required"),
		college_city: z.string().min(1, "College city is required"),
		is_amrita_student: z.boolean().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	})
	.refine(
		(data) =>
			!data.is_amrita_student ||
			data.college_name === "Amrita Vishwa Vidyapeetham",
		{
			path: ["college_name"],
			message:
				"College name must be Amrita Vishwa Vidyapeetham if you are from Amrita Coimbatore",
		},
	)
	.refine(
		(data) => !data.is_amrita_student || data.college_city === "Coimbatore",
		{
			path: ["college_city"],
			message:
				"College city must be Coimbatore if you are from Amrita Coimbatore",
		},
	)
	.refine(
		(data) =>
			!data.is_amrita_student ||
			data.email.endsWith("@cb.amrita.edu") ||
			data.email.endsWith("@cb.students.amrita.edu"),
		{
			path: ["email"],
			message:
				"Email must end with @cb.amrita.edu or @cb.students.amrita.edu if you are from Amrita Coimbatore",
		},
	);

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

export interface SignUpPayload extends SignUpFormValues {
	amrita_roll_number?: string;
}
