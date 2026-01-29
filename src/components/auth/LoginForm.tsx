import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type LoginFormValues, loginFormSchema } from "@/types/login"; // Import from central types
import RetroWindowWrapper from "../RetroWindowWrapper";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface LoginFormProps {
	onSubmit: (data: LoginFormValues) => void; // Use LoginFormValues
	isSubmitting: boolean;
}

const LoginForm = ({ onSubmit, isSubmitting }: LoginFormProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginFormValues>({
		// Use LoginFormValues
		resolver: zodResolver(loginFormSchema), // Use imported schema
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<RetroWindowWrapper className="w-full max-w-md mx-auto" title="">
			<div className="text-center mb-4">
				<h1
					className="text-white text-2xl tracking-widest"
					style={{ fontFamily: '"Press Start 2P", cursive' }}
				>
					LOGIN
				</h1>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
					style={{ fontFamily: '"Press Start 2P", cursive' }}
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white text-[10px]">
									EMAIL ADDRESS
								</FormLabel>
								<FormControl>
									<Input
										placeholder="email@example.com"
										{...field}
										className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
										style={{ fontFamily: '"Press Start 2P", cursive' }}
									/>
								</FormControl>
								<FormMessage className="text-[8px] text-red-500" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white text-[10px]">
									PASSWORD
								</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="........"
											{...field}
											className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] pr-10 text-[10px]"
											style={{ fontFamily: '"Press Start 2P", cursive' }}
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a855f7]/60 hover:text-[#a855f7]"
										>
											{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>
								</FormControl>
								<FormMessage className="text-[8px] text-red-500" />
								<div className="flex justify-end mt-1">
									<Link
										to="/reset-password"
										className="text-[8px] text-[#a855f7] hover:text-[#d8b4fe] hover:underline"
									>
										FORGOT PASSWORD?
									</Link>
								</div>
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="w-full bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold py-2 mt-2 text-xs"
						disabled={isSubmitting}
						style={{ fontFamily: '"Press Start 2P", cursive' }}
					>
						{isSubmitting ? "ACCESSING..." : "LOGIN"}
					</Button>

					<div className="text-center text-[10px] text-white/50 mt-1">
						Dont have an account?{" "}
						<Link
							to="/signup"
							className="text-[#a855f7] hover:text-[#d8b4fe] hover:underline font-bold"
						>
							Register
						</Link>
					</div>
				</form>
			</Form>
		</RetroWindowWrapper>
	);
};

export default LoginForm;
