"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	createGroupFormSchema,
	type GroupRegistrationFormProps,
	type GroupRegistrationOutput,
} from "@/types/groupRegistration";

export function GroupRegistrationForm({
	leaderEmail,
	maxTeamSize,
	minTeamSize = 2,
	onSubmit,
	className,
}: GroupRegistrationFormProps) {
	// Calculate how many teammates are needed (excluding leader)
	const minTeammates = Math.max(0, minTeamSize - 1);
	const maxTeammates = Math.max(0, maxTeamSize - 1);

	const formSchema = createGroupFormSchema(
		minTeamSize,
		maxTeamSize,
		leaderEmail,
	);
	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			teamName: "",
			teammates: Array.from({ length: minTeammates }, () => ({
				email: "",
			})),
		},
		mode: "onChange",
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "teammates",
	});

	const onInvalid = (errors: any) => {
		console.log("Form validation failed:", errors);
		const messages: string[] = [];

		const collectErrors = (errObj: any) => {
			if (!errObj) return;
			if (errObj.message && typeof errObj.message === "string") {
				messages.push(errObj.message);
			}
			if (typeof errObj === "object") {
				Object.values(errObj).forEach((val) => collectErrors(val));
			}
		};

		collectErrors(errors);

		// Deduplicate and show
		[...new Set(messages)].forEach((msg) => toast.error(msg));
	};

	const handleSubmit = (values: FormValues) => {
		console.log("Form valid, submitting:", values);
		const output: GroupRegistrationOutput = {
			team_name: values.teamName,
			team_members: values.teammates.map((t) => ({
				student_email: t.email,
				student_role: "member",
			})),
		};
		console.log("Calling onSubmit with:", output);
		console.log("onSubmit function:", onSubmit);
		onSubmit(output);
		console.log("onSubmit called successfully");
	};

	return (
		<div className={cn("w-full max-w-2xl mx-auto space-y-6", className)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit, onInvalid)}
					className="space-y-6"
				>
					{/* Team Name */}
					<FormField
						control={form.control}
						name="teamName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>TEAM NAME</FormLabel>
								<FormControl>
									<Input placeholder="Enter your team name" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					{/* Teammates Section */}
					<div className="space-y-4">
						<div className="flex items-end justify-between border-b pb-2">
							<h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
								Team Members ({fields.length + 1} / {maxTeamSize})
							</h3>
							{fields.length < maxTeammates && (
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => append({ email: "" })}
									className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
								>
									<Plus className="w-4 h-4" />
									<span className="hidden sm:inline">Add Member</span>
									<span className="sm:hidden">Add</span>
								</Button>
							)}
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<FormLabel>Team Leader</FormLabel>
								<Input value={leaderEmail} disabled className="bg-muted/50" />
							</div>

							{fields.map((field, index) => (
								<div
									key={field.id}
									className="flex gap-4 items-end animate-in fade-in slide-in-from-top-2"
								>
									<FormField
										control={form.control}
										name={`teammates.${index}.email`}
										render={({ field }) => (
											<FormItem className="flex-1 w-full">
												<FormLabel>Team Member {index + 2}</FormLabel>
												<FormControl>
													<Input placeholder="Email" {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									{/* Delete Button */}
									{fields.length > minTeammates && (
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
											onClick={() => remove(index)}
											title="Remove teammate"
										>
											<Trash2 className="w-4 h-4" />
											<span className="sr-only">Remove teammate</span>
										</Button>
									)}
								</div>
							))}
						</div>
					</div>

					<div className="flex justify-center">
						<Button type="submit" className="w-fit">
							Register Team
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
