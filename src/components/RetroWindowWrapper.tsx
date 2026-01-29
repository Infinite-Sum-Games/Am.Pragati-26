import { Minus, Square, X } from "lucide-react";
import type React from "react";
import { cn } from "../lib/utils";

interface RetroWindowWrapperProps {
	children: React.ReactNode;
	className?: string;
	title?: string;
}

const RetroWindowWrapper = ({
	children,
	className,
	title = "LOGIN", // Default title
}: RetroWindowWrapperProps) => {
	return (
		<div
			className={cn(
				"relative rounded-sm overflow-hidden border border-[#7e22ce]/50 shadow-[0_0_20px_rgba(126,34,206,0.6)] backdrop-blur-md",
				"bg-black/40", // Base background behind glass
				className,
			)}
		>
			{/* Retro Header Bar */}
			<div className="h-8 bg-[#7e22ce] flex items-center justify-between px-2 select-none">
				<div className="flex items-center gap-2">
					{title && (
						<>
							{/* Window Icon (optional) */}
							<div className="w-3 h-3 bg-white/20 rounded-sm" />
							<span
								className="text-white font-bold tracking-widest text-sm"
								style={{ fontFamily: "'vcr', monospace" }}
							>
								{title}
							</span>
						</>
					)}
				</div>
				<div className="flex items-center gap-1">
					<button
						type="button"
						className="p-0.5 hover:bg-white/20 rounded-sm text-white/80 hover:text-white transition-colors"
					>
						<Minus size={12} strokeWidth={3} />
					</button>
					<button
						type="button"
						className="p-0.5 hover:bg-white/20 rounded-sm text-white/80 hover:text-white transition-colors"
					>
						<Square size={10} strokeWidth={3} />
					</button>
					<button
						type="button"
						className="p-0.5 hover:bg-red-500 rounded-sm text-white/80 hover:text-white transition-colors"
					>
						<X size={12} strokeWidth={3} />
					</button>
				</div>
			</div>

			{/* Glass Body */}
			<div className="retro-glass p-8 relative">
				{/* Scanline effect overlay (optional, subtle) */}
				<div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(transparent,transparent_2px,black_3px)] z-0"></div>

				<div className="relative z-10">{children}</div>
			</div>
		</div>
	);
};

export default RetroWindowWrapper;
