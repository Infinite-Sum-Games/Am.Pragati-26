import { createFileRoute } from "@tanstack/react-router";
import RetroWindowWrapper from '@/components/RetroWindowWrapper';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useResetPassword } from '@/hooks/useResetPassword';
import { Link } from '@tanstack/react-router'; // Import Link for navigation

const pixelFont = {
  fontFamily: '"Press Start 2P", cursive',
};

export const Route = createFileRoute("/forgot-password/")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const mutation = useResetPassword();

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
      <RetroWindowWrapper className="max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center mb-2">
            <h1 className="text-2xl font-bold text-white mt-2 text-center" style={pixelFont}>
              RESET PASSWORD
            </h1>
            <p className="text-white/50 text-center text-sm mt-1" style={pixelFont}>
              ENTER YOUR REGISTERED EMAIL AND A NEW PASSWORD
            </p>
          </div>
          <ResetPasswordForm
            onSubmit={(values) => mutation.mutate(values)}
            isSubmitting={mutation.isPending}
          />
          <div className="text-center mt-1">
            <Link
              to="/login"
              className="text-[#a855f7] text-sm hover:underline transition"
              style={pixelFont}
            >
              &larr; BACK TO LOGIN
            </Link>
          </div>
        </div>
      </RetroWindowWrapper>
    </div>
	);
}
