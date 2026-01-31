import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileCardSkeleton } from "@/components/profile/ProfileCardSkeleton";
import TransactionList from "@/components/profile/TransactionList";
import { profileFormStore, useProfileStore } from "@/store/profileStore";
import type { Profile, ProfileFormValues } from "@/types/profileTypes";
import { profileFormSchema } from "@/types/profileTypes";
import TicketSection from "./TicketSection";
import Navbar from "../Navbar";

const BACKGROUND_IMAGE_URL = "https://s63kyli3m9.ufs.sh/f/1VhMoqev0KlPOPCFLYsVs2cHu93gP8v0qI6OzjfNY5Adxaen";

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
	{ id: "events", label: "TICKETS" },
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
					<div className="absolute inset-0 bg-black/50"></div>
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
					<p className="text-red-400 font-vcr text-xl mb-2">Unable to load Profile</p>
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
				<p className="text-white/70 text-center font-vcr relative z-10">No data found.</p>
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
				<div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70"></div>
				
				{/* Animated stars effect */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{[...Array(50)].map((_, i) => (
						<div
							key={i}
							className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 3}s`,
								opacity: Math.random() * 0.5 + 0.3,
							}}
						/>
					))}
				</div>
			</div>

			{/* Content Container - Everything scrolls together */}
			<div className="relative z-10 py-8 px-4 md:py-12">
				<div className="max-w-7xl mx-auto">
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

						{activeTab === "events" && (
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
					
					{/* Navigation - Scrolls with content */}
					
					{/* Small Screens (< 1024px) - Compact DJ Console */}
					<div className="lg:hidden flex justify-center mb-8">
						<div className="relative">
							{/* Console Base */}
							<div className="bg-gradient-to-b from-[#1a0033]/95 to-black/95 rounded-xl border-3 border-[#00f0ff]/60 shadow-2xl shadow-[#00f0ff]/30 backdrop-blur-sm p-3">
								{/* Top Accent Line */}
								<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff00ff] via-[#00f0ff] to-[#ff00ff] rounded-t-xl"></div>
								
								{/* Screens Container */}
								<div className="flex gap-2 mb-3">
									{PROFILE_TABS.map((tab) => {
										const isActive = activeTab === tab.id;
										return (
											<button
												key={tab.id}
												onClick={() => setActiveTab(tab.id as any)}
												className="group relative"
											>
												{/* Monitor Screen */}
												<div
													className={`
														relative w-20 h-16 rounded-md transition-all duration-300
														border-2 overflow-hidden
														${
															isActive
																? "border-[#00f0ff] bg-gradient-to-br from-[#00f0ff]/30 to-[#ff00ff]/20 shadow-lg shadow-[#00f0ff]/60"
																: "border-[#00f0ff]/40 bg-gradient-to-br from-black/80 to-[#1a0033]/80 hover:border-[#00f0ff]/70 hover:shadow-md hover:shadow-[#00f0ff]/40"
														}
													`}
												>
													{/* Screen Content */}
													<div className="absolute inset-0 flex items-center justify-center px-1">
														<span
															className={`
																text-[0.6rem] font-vcr uppercase tracking-tight transition-colors duration-300 text-center leading-tight
																${isActive ? "text-[#00f0ff] font-bold" : "text-white/60 group-hover:text-white/80"}
															`}
														>
															{tab.label}
														</span>
													</div>

													{/* Scanlines */}
													<div
														className="absolute inset-0 pointer-events-none"
														style={{
															backgroundImage:
																"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.05) 2px, rgba(0, 240, 255, 0.05) 4px)",
														}}
													></div>

													{/* Active Glow */}
													{isActive && (
														<div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/20 via-transparent to-transparent animate-pulse"></div>
													)}
												</div>

												{/* Screen Stand */}
												<div className={`w-1.5 h-1.5 mx-auto mt-1 rounded-full transition-colors duration-300 ${
													isActive ? "bg-[#00f0ff] shadow-lg shadow-[#00f0ff]/60" : "bg-[#00f0ff]/30"
												}`}></div>
											</button>
										);
									})}
								</div>

								{/* Console Buttons Row */}
								<div className="flex justify-center gap-1.5 px-1">
									<div className="w-4 h-1.5 rounded-full bg-green-500/80 shadow-sm shadow-green-500/50"></div>
									<div className="w-4 h-1.5 rounded-full bg-[#ff00ff]/80 shadow-sm shadow-[#ff00ff]/50"></div>
									<div className="w-4 h-1.5 rounded-full bg-yellow-500/80 shadow-sm shadow-yellow-500/50"></div>
									<div className="w-4 h-1.5 rounded-full bg-blue-500/80 shadow-sm shadow-blue-500/50"></div>
								</div>

								{/* Bottom Accent */}
								<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/40 via-[#ff00ff]/40 to-red-500/40 rounded-b-xl"></div>
							</div>
						</div>
					</div>

					{/* Large Screens (>= 1024px) - Separate Cards */}
					<div className="hidden lg:block mb-8">
						<div className="w-full px-4">
							{/* Container for the three screens */}
							<div className="relative w-full max-w-[1920px] mx-auto">
								<div className="flex justify-center items-end pb-8">
									<div className="flex gap-[1.5vw] xl:gap-[2vw] 2xl:gap-[2.5vw]">
										{PROFILE_TABS.map((tab, index) => {
											const isActive = activeTab === tab.id;
											return (
												<button
													key={tab.id}
													onClick={() => setActiveTab(tab.id as any)}
													className="group relative"
													style={{
														marginLeft: index === 0 ? '0' : index === 1 ? '0.5vw' : '1vw',
														marginRight: index === 2 ? '0' : index === 1 ? '0.5vw' : '1vw',
													}}
												>
													{/* Screen Card */}
													<div
														className={`
															relative rounded-lg transition-all duration-300
															border-[3px] overflow-hidden
															${
																isActive
																	? "border-[#00f0ff] bg-gradient-to-br from-[#00f0ff]/30 to-[#ff00ff]/20 shadow-xl shadow-[#00f0ff]/60"
																	: "border-[#00f0ff]/40 bg-gradient-to-br from-black/80 to-[#1a0033]/80 hover:border-[#00f0ff]/70 hover:shadow-lg hover:shadow-[#00f0ff]/40"
															}
														`}
														style={{
															width: 'clamp(120px, 9vw, 180px)',
															height: 'clamp(90px, 7vw, 140px)',
														}}
													>
														{/* Screen Content */}
														<div className="absolute inset-0 flex items-center justify-center px-2">
															<span
																className={`
																	font-vcr uppercase tracking-wide transition-colors duration-300 text-center
																	${isActive ? "text-[#00f0ff] font-bold" : "text-white/60 group-hover:text-white/80"}
																`}
																style={{
																	fontSize: 'clamp(0.65rem, 0.9vw, 1rem)',
																}}
															>
																{tab.label}
															</span>
														</div>

														{/* Scanlines effect */}
														<div
															className="absolute inset-0 pointer-events-none"
															style={{
																backgroundImage:
																	"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.05) 2px, rgba(0, 240, 255, 0.05) 4px)",
															}}
														></div>

														{/* Active Glow */}
														{isActive && (
															<div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/20 via-transparent to-transparent animate-pulse"></div>
														)}
													</div>

													{/* Screen indicator dot */}
													<div 
														className={`mx-auto mt-2 rounded-full transition-colors duration-300 ${
															isActive ? "bg-[#00f0ff] shadow-lg shadow-[#00f0ff]/60" : "bg-[#00f0ff]/30"
														}`}
														style={{
															width: 'clamp(6px, 0.6vw, 10px)',
															height: 'clamp(6px, 0.6vw, 10px)',
														}}
													></div>
												</button>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}