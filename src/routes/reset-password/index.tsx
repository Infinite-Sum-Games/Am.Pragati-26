import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordForm } from "@/components/ResetPassword/ResetPasswordForm";
import { useResetPassword } from "@/hooks/useResetPassword";

export const Route = createFileRoute("/reset-password/")({
	component: ResetPasswordPage,
});

function ResetPasswordPage() {
	const mutation = useResetPassword();

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-[url('/generated_login_bg.png')] bg-cover bg-center bg-no-repeat fixed w-full h-full">
			<div className="absolute inset-0 bg-black opacity-70"></div>
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
			<ResetPasswordForm
				onSubmit={(values) => mutation.mutate(values)}
				isSubmitting={mutation.isPending}
			/>
		</div>
	);
}
