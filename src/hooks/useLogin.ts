import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { hashPassword } from "@/lib/utils"; // Import hashPassword
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import type { LoginFormValues } from "@/types/login"; // Import LoginFormValues

export const useLogin = () => {
	const navigate = useNavigate();
	const setUser = useAuthStore((state) => state.setUser);

	return useMutation({
		mutationFn: async (values: LoginFormValues) => {
			const hashed = await hashPassword(values.password);
			return AuthService.login({ ...values, password: hashed });
		},
		onSuccess: (data) => {
			setUser({
				name: data.name,
				email: data.email,
				student_id: data.student_id,
			});
			navigate({ to: "/events" }); // Assuming /events route exists, otherwise just /
		},
	});
};
