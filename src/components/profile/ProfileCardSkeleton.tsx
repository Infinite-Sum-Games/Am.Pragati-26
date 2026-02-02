export function ProfileCardSkeleton() {
	return (
		<div className="w-full mx-auto max-w-6xl px-4">
			{/* Console Navigation Skeleton */}
			<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
				<div className="bg-black/95 rounded-2xl border-4 border-[#a855f7]/40 p-4 animate-pulse">
					<div className="flex gap-6 mb-4">
						{[1, 2, 3].map((i) => (
							<div key={i} className="space-y-2">
								<div className="w-32 h-24 bg-[#a855f7]/20 border-4 border-[#a855f7]/30 rounded-lg"></div>
								<div className="w-2 h-2 mx-auto rounded-full bg-[#a855f7]/30"></div>
							</div>
						))}
					</div>
					<div className="flex justify-center gap-2">
						<div className="w-6 h-2 rounded-full bg-green-500/40"></div>
						<div className="w-6 h-2 rounded-full bg-[#ff00ff]/40"></div>
						<div className="w-6 h-2 rounded-full bg-yellow-500/40"></div>
						<div className="w-6 h-2 rounded-full bg-blue-500/40"></div>
					</div>
				</div>
			</div>

			{/* Content Skeleton */}
			<div className="bg-gradient-to-br from-black/90 via-[#0a0015]/95 to-black/90 rounded-2xl border-2 border-[#a855f7]/40 p-12 animate-pulse">
				<div className="flex flex-col md:flex-row gap-8 items-start mb-8">
					<div className="w-40 h-40 rounded-full bg-[#a855f7]/20 border-4 border-[#a855f7]/30"></div>
					<div className="flex-1 space-y-4">
						<div className="h-10 w-64 bg-[#a855f7]/20 rounded"></div>
						<div className="h-4 w-48 bg-[#a855f7]/20 rounded"></div>
						<div className="h-px w-full bg-[#a855f7]/20"></div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="space-y-2">
						<div className="h-4 w-16 bg-[#a855f7]/20 rounded"></div>
						<div className="h-10 w-full bg-[#a855f7]/20 rounded"></div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="space-y-2">
								<div className="h-4 w-20 bg-[#a855f7]/20 rounded"></div>
								<div className="h-10 w-full bg-[#a855f7]/20 rounded"></div>
							</div>
						))}
					</div>
				</div>

				<div className="flex gap-4 justify-center mt-10 pt-8 border-t border-[#a855f7]/20">
					<div className="h-12 w-40 bg-[#a855f7]/20 rounded"></div>
				</div>
			</div>
		</div>
	);
}
