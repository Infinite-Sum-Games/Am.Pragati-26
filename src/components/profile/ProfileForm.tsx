import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileCardSkeleton } from "@/components/profile/ProfileCardSkeleton";
import TransactionList from "@/components/profile/TransactionList";
import { profileFormStore, useProfileStore } from "@/store/profileStore";
import type { Profile, ProfileFormValues } from "@/types/profileTypes";
import { profileFormSchema } from "@/types/profileTypes";
import Navbar from "../Navbar";
import TicketSection from "./TicketSection";

const BACKGROUND_IMAGE_URL =
	"https://speugdv1vi.ufs.sh/f/y8q1VPJuKeA14UCdEhnMklqPihLE6Y7p9suDd2cTxZ5vnezt";

const mockProfile: Profile = {
	name: "John Doe",
	email: "john.doe@example.com",
	phone_number: "9876543210",
	college_name: "Example University",
	college_city: "Coimbatore",
	is_amrita_student: false,
	is_registered: true,
};

const PROFILE_TABS = [
	{ id: "profile", label: "PROFILE" },
	{ id: "tickets", label: "TICKETS" },
	{ id: "transactions", label: "TRANSACTIONS" },
] as const;

export function ProfileForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
	});

	const setIsEditMode = useProfileStore((state) => state.setIsEditMode);

	const data = mockProfile;
	const isLoading = false;
	const error = null;

	const { setAllFields, setActiveTab, activeTab } = profileFormStore();

	useEffect(() => {
		if (data) {
			setAllFields({
				name: data.name,
				phone_number: data.phone_number,
				college_name: data.college_name,
				college_city: data.college_city,
			});
			reset(data);
		}
	}, [data, setAllFields, reset]);

	const onSubmit = handleSubmit(async (values) => {
		setAllFields(values);
		try {
			console.log("Profile updated:", values);
			reset(values);
			setIsEditMode(false);
		} catch (e) {
			console.error("Error updating profile:", e);
			reset(data);
			setIsEditMode(false);
		}
	});

	if (isLoading) {
		return (
			<main className="min-h-screen relative overflow-hidden">
				<div className="fixed inset-0 z-0">
					<div
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
					/>
					<div className="absolute inset-0 bg-black/60"></div>
				</div>
				<div className="relative z-10 py-6 px-4">
					<ProfileCardSkeleton />
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
				<div className="fixed inset-0 z-0">
					<div
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
					/>
					<div className="absolute inset-0 bg-black/50"></div>
				</div>
				<div className="text-center relative z-10">
					<p className="text-red-400 font-vcr text-xl mb-2">
						Unable to load Profile
					</p>
					<p className="text-white/70 font-vcr">Please try again later</p>
				</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
				<div className="fixed inset-0 z-0">
					<div
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
					/>
					<div className="absolute inset-0 bg-black/50"></div>
				</div>
				<p className="text-white/70 text-center font-vcr relative z-10">
					No data found.
				</p>
			</div>
		);
	}

	return (
		<main className="min-h-screen relative overflow-hidden">
			<Navbar />
			{/* Background Layer with CDN Image */}
			<div className="fixed inset-0 z-0">
				{/* CDN Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
				/>

				{/* Overlay for better readability */}
				<div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/40 to-black/90"></div>
			</div>

			{/* Content Container - Everything scrolls together */}
			<div className="relative z-10 pt-24 pb-8 px-4 md:pt-28 md:pb-12">
				<div className="max-w-7xl mx-auto">
					{/* UNIFIED TAB NAVIGATION */}
					<div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
						<div className="bg-black/40 backdrop-blur-md border border-retro-cyan/30 p-2 rounded-lg flex flex-wrap justify-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
							{PROFILE_TABS.map((tab) => {
								const isActive = activeTab === tab.id;
								return (
									<button
										type="button"
										key={tab.id}
										onClick={() =>
											setActiveTab(
												tab.id as "profile" | "tickets" | "transactions",
											)
										}
										className={`
										relative px-6 py-2 md:px-8 md:py-3 font-bold font-vcr uppercase tracking-widest transition-all duration-200 border-2
										${
											isActive
												? "bg-[#7c3aed] border-black text-white shadow-[4px_4px_0_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
												: "bg-transparent border-transparent text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10"
										}
									`}
									>
										{tab.label}
									</button>
								);
							})}
						</div>
					</div>

					{/* Tab Content */}
					<div className="min-h-[70vh] mb-8 lg:mb-12">
						{activeTab === "profile" && (
							<ProfileCard
								avatarEmail={data.email}
								email={data.email}
								name={data.name}
								phone_number={data.phone_number}
								college_name={data.college_name}
								college_city={data.college_city}
								register={register}
								reset={reset}
								errors={{
									name: errors.name?.message,
									phone_number: errors.phone_number?.message,
									college_name: errors.college_name?.message,
									college_city: errors.college_city?.message,
								}}
								onSubmit={onSubmit}
								isDirty={isDirty}
								is_amrita_coimbatore={data.is_amrita_student}
								has_offline_event={data.is_registered}
							/>
						)}

						{activeTab === "tickets" && (
							<div className="w-full">
								<TicketSection />
							</div>
						)}

						{activeTab === "transactions" && (
							<div className="w-full">
								<TransactionList />
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
