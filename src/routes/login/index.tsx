import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../../components/auth/LoginForm";
import { useLogin } from "../../hooks/useLogin";

export const Route = createFileRoute("/login/")({
	component: LoginPage,
});

function LoginPage() {
	const { mutate: login, isPending } = useLogin();

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-black">
			{/* Background decorations or gradient can be added here if needed, keeping it simple black for now as per glass effect desire */}
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
			<LoginForm onSubmit={login} isSubmitting={isPending} />
		</div>
	);
}
