import type React from "react";
import { cn } from "../lib/utils";

interface GlassFormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	showCorners?: boolean;
}

const GlassFormWrapper: React.FC<GlassFormWrapperProps> = ({
	children,
	className,
	showCorners = true,
	...props
}) => {
	return (
		<div
			className={cn(
				"retro-glass form-reveal-animation relative p-6 md:p-8 rounded-lg",
				className,
			)}
			{...props}
		>
			{showCorners && (
				<>
					{/* Top Left Corner */}
					<div className="absolute -top-3 -left-3 w-16 h-16 pointer-events-none z-10">
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 64 64"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Corner Decoration</title>
							<path
								d="M2 62V2H62"
								stroke="#ff7425"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					{/* Top Right Corner */}
					<div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none z-10 rotate-90">
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 64 64"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Corner Decoration</title>
							<path
								d="M2 62V2H62"
								stroke="#ff7425"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					{/* Bottom Right Corner */}
					<div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none z-10 rotate-180">
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 64 64"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Corner Decoration</title>
							<path
								d="M2 62V2H62"
								stroke="#ff7425"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					{/* Bottom Left Corner */}
					<div className="absolute -bottom-3 -left-3 w-16 h-16 pointer-events-none z-10 -rotate-90">
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 64 64"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Corner Decoration</title>
							<path
								d="M2 62V2H62"
								stroke="#ff7425"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</>
			)}
			{children}
		</div>
	);
};

export default GlassFormWrapper;
