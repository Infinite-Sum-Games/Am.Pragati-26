"use client";

import { useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { apiGet } from "@/lib/api";
import { useAuthStore } from "../store/auth.store";

async function sha256(message: string) {
	const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
	const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	return hashHex;
}

const AuthService = {
	logout: async (): Promise<{ message: string }> => {
		try {
			return await apiGet<{ message: string }>("/auth/user/logout");
		} catch (error: unknown) {
			let message = "Logout failed";
			if (error && typeof error === "object" && "response" in error) {
				const err = error as { response?: { data?: { message?: string } } };
				message = err.response?.data?.message || message;
			} else if (error && typeof error === "object" && "message" in error) {
				const err = error as { message?: string };
				message = err.message || message;
			}
			throw new Error(message);
		}
	},
};

const getInitials = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

const pixelFont = {
	fontFamily: '"Press Start 2P", cursive',
	letterSpacing: "-1px",
};

export function NavbarAuth() {
	const router = useRouter();
	const { user, logout: logoutStore, isHydrated } = useAuthStore();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [avatarHash, setAvatarHash] = useState<string>("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	useEffect(() => {
		if (user?.email) {
			sha256(user.email).then(setAvatarHash);
		}
	}, [user?.email]);

	const handleLogout = async () => {
		try {
			await AuthService.logout();
			logoutStore();
			toast.success("Logged out successfully");
			setDropdownOpen(false);
			router.navigate({ to: "/" });
		} catch (_error) {
			logoutStore();
			router.navigate({ to: "/" });
		}
	};

	if (!isHydrated) return null;

	if (!user) {
		return (
			<div className="pointer-events-auto block">
				<motion.button
					onClick={() => router.navigate({ to: "/login" })}
					whileHover={{ y: -4, boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
					whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
					style={pixelFont}
					className="h-12 px-6 bg-[#7e22ce] border-4 border-black text-white text-sm uppercase tracking-wider shadow-[4px_4px_0_rgba(0,0,0,0.5)] transition-all flex items-center"
				>
					LOGIN
				</motion.button>
			</div>
		);
	}

	return (
		<div className="relative pointer-events-auto" ref={dropdownRef}>
			<motion.button
				onClick={() => setDropdownOpen(!dropdownOpen)}
				whileHover={{ y: -4, boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
				whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
				className="h-12 w-12 bg-[#7e22ce] border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center transition-all"
			>
				{user.email && avatarHash ? (
					<img
						src={`https://www.gravatar.com/avatar/${avatarHash}?s=100&d=robohash`}
						alt={user.name || "User"}
						className="w-full h-full object-cover"
						style={{ imageRendering: "pixelated" }}
					/>
				) : (
					<span style={pixelFont} className="text-white text-[10px]">
						{getInitials(user.name || "U")}
					</span>
				)}
			</motion.button>

			<AnimatePresence>
				{dropdownOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						className="absolute right-0 mt-4 w-64 bg-black border-4 border-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] z-50 overflow-hidden"
					>
						<div className="p-4 border-b-4 border-white bg-[#2e1065]">
							<p
								style={pixelFont}
								className="text-[10px] text-cyan-400 truncate mb-1"
							>
								{user.name || "USER"}
							</p>
							<p className="text-[8px] text-white/60 truncate font-mono uppercase tracking-tighter">
								{user.email}
							</p>
						</div>

						<div className="flex flex-col">
							<button
								type="button"
								onClick={() => {
									router.navigate({ to: "/profile" });
									setDropdownOpen(false);
								}}
								className="flex items-center gap-3 p-4 hover:bg-[#2e1065]  text-white transition-colors text-left"
							>
								<UserIcon size={16} />
								<span style={pixelFont} className="text-[10px]">
									PROFILE
								</span>
							</button>
							<button
								type="button"
								onClick={handleLogout}
								className="flex items-center gap-3 p-4 hover:bg-red-500 hover:text-white text-red-400 transition-colors text-left border-t-4 border-white"
							>
								<LogOut size={16} />
								<span style={pixelFont} className="text-[10px]">
									LOGOUT
								</span>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
