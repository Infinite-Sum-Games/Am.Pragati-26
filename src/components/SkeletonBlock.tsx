export function SkeletonBlock({ className }: { className?: string }) {
	return <div className={`bg-gray-200 rounded ${className} animate-pulse`} />;
}
