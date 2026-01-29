import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	type ResetPasswordFormValues,
	resetPasswordSchema,
} from "@/types/resetPasswordTypes";

interface ResetPasswordFormProps {
	onSubmit: (values: ResetPasswordFormValues) => void; // Use full values
	isSubmitting: boolean;
}

const pixelFont = {
	fontFamily: '"Press Start 2P", cursive',
};

export function ResetPasswordForm({
	onSubmit,
	isSubmitting,
}: ResetPasswordFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<form
			className="flex flex-col gap-5"
			onSubmit={handleSubmit(onSubmit)} // Pass full values
			noValidate
		>
			<div className="flex flex-col gap-1.5">
				<Label
					htmlFor="email"
					className="font-medium text-sm text-white text-[10px]"
					style={pixelFont}
				>
					EMAIL
				</Label>
				{/* biome-ignore lint/correctness/useUniqueElementIds: fixed IDs are used for label association in this form */}
				<Input
					id="email"
					type="email"
					placeholder="ENTER YOUR EMAIL"
					{...register("email")}
					disabled={isSubmitting}
					className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
					style={pixelFont}
				/>
				{errors.email && (
					<p className="text-red-500 text-[8px]" style={pixelFont}>
						{errors.email.message}
					</p>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				<Label
					htmlFor="password"
					className="font-medium text-sm text-white text-[10px]"
					style={pixelFont}
				>
					NEW PASSWORD
				</Label>
				<div className="relative">
					{/* biome-ignore lint/correctness/useUniqueElementIds: fixed IDs are used for label association in this form */}
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="ENTER NEW PASSWORD"
						{...register("password")}
						disabled={isSubmitting}
						className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] pr-10 text-[10px]"
						style={pixelFont}
					/>
					<button
						type="button"
						tabIndex={-1}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a855f7]/60 hover:text-[#a855f7]"
						onClick={() => setShowPassword((v) => !v)}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
				{errors.password && (
					<p className="text-red-500 text-[8px]" style={pixelFont}>
						{errors.password.message}
					</p>
				)}
			</div>
			<div className="flex flex-col gap-1.5">
				<Label
					htmlFor="confirmPassword"
					className="font-medium text-sm text-white text-[10px]"
					style={pixelFont}
				>
					CONFIRM NEW PASSWORD
				</Label>
				<div className="relative">
					{/* biome-ignore lint/correctness/useUniqueElementIds: fixed IDs are used for label association in this form */}
					<Input
						id="confirmPassword"
						type={showConfirmPassword ? "text" : "password"}
						placeholder="CONFIRM NEW PASSWORD"
						{...register("confirmPassword")}
						disabled={isSubmitting}
						className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] pr-10 text-[10px]"
						style={pixelFont}
					/>
					<button
						type="button"
						tabIndex={-1}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a855f7]/60 hover:text-[#a855f7]"
						onClick={() => setShowConfirmPassword((v) => !v)}
						aria-label={showConfirmPassword ? "Hide password" : "Show password"}
					>
						{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
				{errors.confirmPassword && (
					<p className="text-red-500 text-[8px]" style={pixelFont}>
						{errors.confirmPassword.message}
					</p>
				)}
			</div>
			<Button
				type="submit"
				className="w-full bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold py-2 text-xs"
				disabled={isSubmitting}
				style={pixelFont}
			>
				{isSubmitting ? (
					<>
						<Loader2 className="h-4 w-4 mr-2 animate-spin" />
						RESETTING PASSWORD...
					</>
				) : (
					"RESET PASSWORD"
				)}
			</Button>
		</form>
	);
}
