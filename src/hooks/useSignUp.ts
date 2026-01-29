import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { hashPassword } from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import {
	type SignUpFormValues,
	type SignUpPayload,
	SignUpSchema,
} from "@/types/signUpTypes";

export function useSignUp() {
	const [step, setStep] = useState(0);
	const navigate = useNavigate(); // Changed from useRouter

	const { mutate: signup, isPending } = useMutation({
		mutationFn: async (data: SignUpFormValues) => {
			const hashedPassword = await hashPassword(data.password);
			const payload: SignUpPayload = {
				...data,
				password: hashedPassword,
				confirmPassword: hashedPassword,
			};

			if (
				data.email.endsWith("@cb.students.amrita.edu") &&
				data.is_amrita_student
			) {
				const rollNumber = data.email.split("@")[0].toUpperCase();
				payload.amrita_roll_number = rollNumber;
			}

			return await AuthService.signUp(payload);
		},
		onSuccess: () => {
			toast.success("Signup Successful! Please verify the OTP.");
			if (typeof window !== "undefined") {
				window.localStorage.setItem(
					"signupResendStartTime",
					Date.now().toString(),
				);
			}
			navigate({ to: "/signup/verify" }); // Changed from router.push
		},
		// biome-ignore lint/suspicious/noExplicitAny: Error handling is also managed by the api interceptor
		onError: (error: any) => {
			// Error handling is also managed by the api interceptor, but a specific toast here is fine.
			toast.error(error?.message || "Signup Failed! Please try again...");
		},
	});

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			name: "",
			email: "",
			phone_number: "",
			password: "",
			confirmPassword: "",
			college_name: "",
			college_city: "",
			is_amrita_student: false,
		},
		shouldFocusError: false,
		mode: "onTouched",
	});

	const { watch, setValue, trigger } = form;

	const is_amrita_student = watch("is_amrita_student") ?? false;

	useEffect(() => {
		if (is_amrita_student) {
			setValue("college_name", "Amrita Vishwa Vidyapeetham", {
				shouldValidate: true,
			});
			setValue("college_city", "Coimbatore", { shouldValidate: true });
		} else {
			setValue("college_name", "", { shouldValidate: true }); // Added shouldValidate
			setValue("college_city", "", { shouldValidate: true }); // Added shouldValidate
		}
	}, [is_amrita_student, setValue]);

	const onSubmit = (data: SignUpFormValues) => {
		signup(data);
	};

	const nextStep = async () => {
		let validated = true;

		if (step === 0) {
			validated = await trigger([
				"name",
				"email",
				"phone_number",
				"is_amrita_student",
			]);
		} else if (step === 1) {
			validated = await trigger(["college_name", "college_city"]);
		} else if (step === 2) {
			validated = await trigger(["password", "confirmPassword"]);
		}

		if (validated) setStep((s) => Math.min(s + 1, 2));
	};

	const prevStep = () => setStep((s) => Math.max(s - 1, 0));

	return {
		form,
		step,
		isPending,
		is_amrita_student,
		onSubmit,
		nextStep,
		prevStep,
	};
}
