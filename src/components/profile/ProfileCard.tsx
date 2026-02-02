import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/profileStore";
import type { PROFILE_CARD_PROPS } from "@/types/profileTypes";

async function sha256(message: string) {
	const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
	const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

const formFields = [
	{ label: "Name", field: "name", placeholder: "Enter Name" },
	{
		label: "Phone Number",
		field: "phone_number",
		placeholder: "+91 99999 99999",
	},
	{
		label: "College Name",
		field: "college_name",
		placeholder: "Enter College Name",
	},
	{
		label: "College City",
		field: "college_city",
		placeholder: "Enter College City",
	},
] as const;

export function ProfileCard({
	avatarEmail,
	email,
	name,
	phone_number,
	college_name,
	college_city,
	register,
	reset,
	errors,
	onSubmit,
	isDirty,
}: PROFILE_CARD_PROPS) {
	const isEditMode = useProfileStore((state) => state.isEditMode);
	const setIsEditMode = useProfileStore((state) => state.setIsEditMode);
	const [isEditDisabled, setIsEditDisabled] = useState(false);
	const [avatarHash, setAvatarHash] = useState<string>("");

	useEffect(() => {
		sha256(avatarEmail).then(setAvatarHash);
	}, [avatarEmail]);

	const handleEditClick = () => setIsEditMode(true);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();

		const hasErrors = Object.keys(errors).some((key) =>
			formFields
				.map((f) => f.field)
				.includes(key as (typeof formFields)[number]["field"]),
		);

		if (hasErrors) return setIsEditMode(true);

		setIsEditDisabled(true);
		setTimeout(() => setIsEditDisabled(false), 3000);
	};

	const handleCancel = () => {
		reset({ name, phone_number, college_name, college_city });
		setIsEditMode(false);
	};

	const avatarUrl = avatarHash
		? `https://www.gravatar.com/avatar/${avatarHash}?s=200&d=robohash`
		: `https://www.gravatar.com/avatar/${avatarEmail}?s=200&d=robohash`;

	const renderInput = (fieldName: (typeof formFields)[number]["field"]) => {
		const fieldObj = formFields.find((f) => f.field === fieldName);
		if (!fieldObj) return null;
		const { label, field, placeholder } = fieldObj;
		const error = errors?.[field];

		const inputClassName = error
			? "bg-red-900/20 border border-red-500 focus:ring-1 focus:ring-red-500 text-white text-sm h-12 font-vcr placeholder:text-red-300/40 rounded-md"
			: isEditMode
				? "bg-black/40 border border-[#a855f7]/50 text-white placeholder:text-white/30 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all duration-200 text-sm h-12 font-vcr rounded-md"
				: "bg-black/40 border border-white/10 text-white/50 cursor-not-allowed text-sm h-12 font-vcr rounded-md";

		return (
			<div key={`${field}-group`} className="space-y-2 w-full">
				<label
					htmlFor={field}
					className="text-retro-cyan text-xs font-bold block uppercase tracking-widest font-vcr mb-1"
				>
					{label}
				</label>
				<Input
					id={field}
					type="text"
					placeholder={placeholder}
					{...register(field)}
					disabled={!isEditMode}
					className={inputClassName}
					required
				/>
				{error && <p className="text-xs text-red-400 font-vcr mt-1">{error}</p>}
			</div>
		);
	};

	return (
		<div className="w-full mx-auto max-w-4xl px-4">
			{/* New Glassmorphism Container */}
			<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 p-8 md:p-12 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
				{/* Profile Header Section */}
				<div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
					{/* Avatar with Arcade Glow - Simplified for new look but keeping some essence */}
					<div className="flex-shrink-0">
						<div className="relative group">
							<div className="relative w-28 h-28 md:w-36 md:h-36">
								<img
									src={avatarUrl}
									alt={name}
									className="w-full h-full rounded-full border-4 border-[#a855f7] relative z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
								/>
							</div>
						</div>
					</div>

					{/* User Info */}
					<div className="flex-1 text-center md:text-left">
						<h2 className="text-3xl md:text-5xl font-bold mb-2 uppercase tracking-tight font-jersey15 text-white drop-shadow-[2px_2px_0px_#a855f7]">
							{name || "USER PROFILE"}
						</h2>
						<p className="text-retro-cyan text-sm md:text-base font-vcr tracking-widest uppercase mb-4 drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
							{email}
						</p>
						<div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#a855f7]/50 to-transparent"></div>
					</div>
				</div>

				{/* FORM FIELDS - Scrollable Container */}
				<div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
					<div className="space-y-6">
						{/* Name Field - Full Width */}
						<div className="w-full">{renderInput("name")}</div>

						{/* Email & Phone Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2 w-full">
								<label
									htmlFor="email"
									className="text-retro-cyan text-xs font-bold block uppercase tracking-widest font-vcr mb-1"
								>
									Email
								</label>
								<Input
									type="email"
									value={email}
									disabled
									className="bg-black/40 border border-white/10 text-white/50 cursor-not-allowed text-sm h-12 font-vcr rounded-md"
								/>
							</div>
							{renderInput("phone_number")}
						</div>

						{/* College Info Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{renderInput("college_name")}
							{renderInput("college_city")}
						</div>
					</div>
				</div>

				{/* ACTION BUTTONS - Updated to Blocky Retro Style */}
				<div className="flex flex-wrap gap-4 justify-center mt-12 pt-8 border-t border-white/10">
					{/* EDIT BUTTON */}
					<Button
						type="button"
						onClick={handleEditClick}
						disabled={isEditDisabled}
						className={cn(
							"relative px-8 py-3 bg-[#7c3aed] border-2 border-black text-white font-vcr font-bold text-lg uppercase tracking-wider transition-all",
							// Hard shadow initial state
							"shadow-[4px_4px_0_rgba(0,0,0,1)]",
							// Hover state: lift button (translate) and increase shadow
							"hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)]",
							// Active state: press down (reduce shadow)
							"active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,1)]",
							isEditMode ? "hidden" : "",
							isEditDisabled ? "opacity-50 cursor-not-allowed" : "",
						)}
					>
						EDIT PROFILE
					</Button>

					{/* SAVE BUTTON */}
					<Button
						type="submit"
						onClick={handleSubmit}
						className={cn(
							"relative px-8 py-3 bg-[#16a34a] border-2 border-black text-white font-vcr font-bold text-lg uppercase tracking-wider transition-all",
							"shadow-[4px_4px_0_rgba(0,0,0,1)]",
							"hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)]",
							"active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,1)]",
							!isEditMode ? "hidden" : "",
						)}
						disabled={!isDirty}
					>
						SAVE CHANGES
					</Button>

					{/* CANCEL BUTTON */}
					<Button
						type="button"
						onClick={handleCancel}
						className={cn(
							"relative px-8 py-3 bg-[#dc2626] border-2 border-black text-white font-vcr font-bold text-lg uppercase tracking-wider transition-all",
							"shadow-[4px_4px_0_rgba(0,0,0,1)]",
							"hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)]",
							"active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,1)]",
							!isEditMode ? "hidden" : "",
						)}
					>
						CANCEL
					</Button>
				</div>
			</div>
		</div>
	);
}
