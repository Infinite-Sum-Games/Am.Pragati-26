import { SkeletonBlock } from "@/components/SkeletonBlock";

const PriceCardSkeleton = () => (
	<div className="h-64 bg-black border-4 border-[#ff00ff] shadow-[4px_4px_0_rgba(255,0,255,1)] p-6 relative animate-pulse">
		{/* Corner decorations */}
		<div className="absolute -top-2 -left-2 w-4 h-4 bg-[#f4d03f] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />
		<div className="absolute -top-2 -right-2 w-4 h-4 bg-[#f4d03f] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />
		<div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#f4d03f] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />
		<div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#f4d03f] shadow-[0_0_10px_rgba(244,208,63,0.8)]" />

		<SkeletonBlock className="h-10 w-1/2 mb-6 bg-linear-to-r from-[#7e22ce]/30 to-[#00ffff]/30" />
		<SkeletonBlock className="h-6 w-full mb-6 bg-linear-to-r from-[#00ffff]/20 to-[#ff00ff]/20" />
		<SkeletonBlock className="h-12 w-full mb-4 bg-linear-to-r from-[#ff00ff]/30 to-[#f4d03f]/30" />
	</div>
);

export default function EventDetailSkeleton() {
	return (
		<div className="w-full max-w-7xl mx-auto">
			<div className="md:grid md:grid-cols-12 md:gap-8">
				<div className="col-span-4 space-y-6 mb-4 md:mb-0">
					<div className="relative w-full aspect-3/4 border-4 border-[#00ffff] shadow-[6px_6px_0_rgba(0,255,255,0.5)] overflow-hidden mb-6 bg-linear-to-br from-purple-950/50 to-black animate-pulse">
						{/* Corner decorations */}
						<div className="absolute top-0 left-0 w-4 h-4 bg-[#ff00ff]" />
						<div className="absolute top-0 right-0 w-4 h-4 bg-[#ff00ff]" />
						<div className="absolute bottom-0 left-0 w-4 h-4 bg-[#ff00ff]" />
						<div className="absolute bottom-0 right-0 w-4 h-4 bg-[#ff00ff]" />
					</div>

					<div className="hidden md:block">
						<PriceCardSkeleton />
					</div>
				</div>

				<div className="col-span-8 space-y-6">
					<div>
						<SkeletonBlock className="h-12 w-full md:w-2/3 mb-4 bg-linear-to-r from-[#f4d03f]/30 to-[#ff8c00]/30 shadow-[3px_3px_0_rgba(0,0,0,0.5)] animate-pulse" />

						<SkeletonBlock className="h-6 w-5/6 bg-linear-to-r from-[#00ffff]/20 to-[#7e22ce]/20 shadow-[2px_2px_0_rgba(0,0,0,0.3)] animate-pulse" />

						<div className="mt-6 flex space-x-3">
							<SkeletonBlock className="h-8 w-20 bg-gray-950 border-2 border-[#00ffff]/50 shadow-[2px_2px_0_rgba(0,255,255,0.3)] animate-pulse" />
							<SkeletonBlock className="h-8 w-24 bg-gray-950 border-2 border-[#00ffff]/50 shadow-[2px_2px_0_rgba(0,255,255,0.3)] animate-pulse" />
							<SkeletonBlock className="h-8 w-20 bg-gray-950 border-2 border-[#00ffff]/50 shadow-[2px_2px_0_rgba(0,255,255,0.3)] animate-pulse" />
						</div>
					</div>

					<div className="md:hidden">
						<PriceCardSkeleton />
					</div>

					<div className="flex w-full gap-4 flex-col md:flex-row">
						<div className="bg-black border-4 border-[#ff8c00] shadow-[4px_4px_0_rgba(255,140,0,1)] p-6 w-full relative animate-pulse">
							{/* Corner decorations */}
							<div className="absolute -top-2 -left-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -top-2 -right-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#00ffff]" />

							<SkeletonBlock className="h-6 w-1/2 bg-linear-to-r from-[#00ffff]/30 to-transparent" />
							<div className="mt-6 space-y-3">
								<SkeletonBlock className="h-6 w-3/4 bg-linear-to-r from-[#f4d03f]/20 to-transparent" />
								<SkeletonBlock className="h-6 w-3/4 bg-linear-to-r from-[#00ffff]/20 to-transparent" />
							</div>
						</div>

						<div className="bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_rgba(126,34,206,1)] p-6 w-full relative animate-pulse">
							{/* Corner decorations */}
							<div className="absolute -top-2 -left-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -top-2 -right-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#00ffff]" />
							<div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#00ffff]" />

							<SkeletonBlock className="h-6 w-1/2 bg-linear-to-r from-[#00ffff]/30 to-transparent" />
							<div className="mt-6 space-y-3">
								<SkeletonBlock className="h-16 w-full bg-gray-950 border-2 border-[#ff00ff]/30" />
								<SkeletonBlock className="h-16 w-full bg-gray-950 border-2 border-[#ff00ff]/30" />
							</div>
						</div>
					</div>

					<div className="bg-black border-4 border-[#7e22ce] shadow-[4px_4px_0_rgba(126,34,206,1)] p-6 w-full space-y-4 relative animate-pulse">
						{/* Corner decorations */}
						<div className="absolute -top-2 -left-2 w-3 h-3 bg-[#f4d03f]" />
						<div className="absolute -top-2 -right-2 w-3 h-3 bg-[#f4d03f]" />
						<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#f4d03f]" />
						<div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[#f4d03f]" />

						<SkeletonBlock className="h-8 w-1/4 bg-linear-to-r from-[#f4d03f]/30 to-transparent" />

						<div className="space-y-2 py-4">
							<SkeletonBlock className="h-4 w-5/6 bg-linear-to-r from-[#00ffff]/20 to-transparent" />
							<SkeletonBlock className="h-4 w-3/4 bg-linear-to-r from-[#00ffff]/20 to-transparent" />
							<SkeletonBlock className="h-4 w-full bg-linear-to-r from-[#00ffff]/20 to-transparent" />
						</div>

						<SkeletonBlock className="h-6 w-1/3 bg-linear-to-r from-[#ff00ff]/30 to-transparent" />

						<div className="space-y-2 py-4">
							<SkeletonBlock className="h-4 w-5/6 bg-linear-to-r from-[#00ffff]/20 to-transparent" />
							<SkeletonBlock className="h-4 w-full bg-linear-to-r from-[#00ffff]/20 to-transparent" />
							<SkeletonBlock className="h-4 w-4/5 bg-linear-to-r from-[#00ffff]/20 to-transparent" />
						</div>

						<SkeletonBlock className="h-6 w-1/3 bg-linear-to-r from-[#f4d03f]/30 to-transparent" />

						<SkeletonBlock className="h-4 w-5/6 bg-linear-to-r from-[#00ffff]/20 to-transparent" />
					</div>
				</div>
			</div>
		</div>
	);
}
